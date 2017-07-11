import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DictresultComponent } from '../dictresult/dictresult.component';

@Injectable()
export class DictQueryService {
  private queryUrl = 'api/cedict/';

  constructor (private http: Http) {}

  queryDict(searchStr : string, pagination : any): Observable<any> {
    return this.http.get(this.queryUrl+searchStr+"?page="+pagination.page+"&pageSize="+pagination.pageSize)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
	let body = res.json();
    return body || {};
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
