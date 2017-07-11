import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {
  trigger,
  state,
  style,
  animate,
  keyframes,
  transition
} from '@angular/animations';

import { DictQueryService } from './cedict.service';
import { DictresultComponent } from '../dictresult/dictresult.component';

@Component({
  selector: 'app-cedict',
  templateUrl: './cedict.component.html',
  styleUrls: ['./cedict.component.css'],
  animations: [
	  trigger('flyInOut', [
	    state('next', style({transform: 'translateX(0)'})),
	    state('back', style({transform: 'translateX(0)'})),
	    transition('void => back', [
	      animate(300, keyframes([
	        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
	        style({opacity: 0.3, transform: 'translateX(5px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
	      ]))
	    ]),
	    transition('void => next', [
	      animate(300, keyframes([
	        style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
	        style({opacity: 0.3, transform: 'translateX(-5px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
	      ]))
	    ]),
	    transition('back => void', [
	      animate(300, keyframes([
	        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
	        style({opacity: 0.3, transform: 'translateX(-5px)', offset: 0.7}),
	        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
	      ]))
	  ]),
	    transition('next => void', [
	      animate(300, keyframes([
	        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
	        style({opacity: 0.3, transform: 'translateX(5px)', offset: 0.7}),
	        style({opacity: 0, transform: 'translateX(-100%)',  offset: 1.0})
	      ]))
	    ])
	  ])
  ]
})
export class CedictComponent implements OnInit {
	public Number : Function;
	public searchText : string;
	public whichWay : string = 'next';
	public searchResults : {results: DictresultComponent[], pagination: Object};
	public animationInitialized : Boolean = false;
	private dqs : DictQueryService;
	public pageDirection : Function = function(page : number) {
		this.whichWay = page > this.searchResults.pagination.page ? 'next' : 'back';
		this.change.detectChanges();
	}
	public searchDict : Function = function(searchText : string, pagination : any) {
		if (this.searchResults.pagination.searchStr != searchText) {
			pagination = {page: 1, pageSize: 20};
		}
		this.router.navigate(['/projects/cedict', {searchTerm: searchText, page: pagination.page, pageSize: pagination.pageSize}]);
	}
	public goToPage : Function = function(page : number) {
		this.pageDirection(page);
		this.searchResults.pagination.page = page;
		this.searchResults.results = [];
		this.searchDict(this.searchResults.pagination.searchStr, this.searchResults.pagination);
	}
	public calcPages : Function = function(currentPage : number, pages : number) {
		if (pages <= 7) {
			return Array(pages).fill(0).map((x,i)=>i+1);
		} else if (currentPage <= 4) {
			return Array(7).fill(0).map((x,i)=>i+1);
		} else {
			var test : number = Number(currentPage) + 6;
			var start : number = Number(currentPage) + 6 >= pages ? pages - 6 : currentPage - 3;
			return Array(7).fill(0).map((x,i)=>i+start);
		}
	}
  constructor(private route: ActivatedRoute, private router: Router, dqs : DictQueryService, private change: ChangeDetectorRef) {
	  this.Number = Number;
	  this.searchResults = {
		  results: null,
		  pagination: {
			  page: 1,
			  pageSize: 20,
			  searchStr: this.searchText
		  }
	  };
	  this.dqs = dqs;
  }

  ngOnInit() {
	  this.route.paramMap
	    .switchMap((params: ParamMap) =>
	      this.dqs.queryDict(params.get('searchTerm'), {page: params.get('page') || 1, pageSize: params.get('pageSize') || 20}))
	    .subscribe(
			(results) => {
				if (results.pagination.searchStr == 'null') return;
				this.searchResults = results.pagination.searchStr == 'null' ? [] : results;
				this.searchText = results.pagination.searchStr;
			},
			(err) => console.log("oh no!")
		);
  }

}
