import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { VOALookupService } from './dictresult.service';

@Component({
  selector: 'app-dictresult',
  templateUrl: './dictresult.component.html',
  styleUrls: ['./dictresult.component.css'],
  animations: [
  trigger('flexGrowInOut', [
      state('void', style({
		  'overflow': 'hidden',
        'flex': 0.00001
      })),
      state('*',   style({
        'flex': 9
      })),
      transition('void <=> *', animate('0.3s ease-in-out'))
  ]),
  trigger('defGrow', [
      state('true', style({
        'flex-grow': 2
      })),
      state('false',   style({
        'flex-grow': 1
      })),
      transition('true <=> false', animate('0.3s ease-in-out'))
    ])
  ]
})
export class DictresultComponent implements OnInit {
	@Input() public term : Object;
	private vls : VOALookupService;
	public actionSection : Boolean = false;
	public article : Object;
	public toggleActionSection : Function = function() {
		this.actionSection = !this.actionSection;
		if (this.actionSection) {
			this.getArticle(this.term.simp);
		}
	}
	public getArticle : Function = function(term : string) {
		if (!this.article) {
			this.vls.voaLookup(term)
				.subscribe(
					results => this.article = results,
					err => console.log("oh no!")
				);
		}
	}
  constructor(vls : VOALookupService) {
	  this.vls = vls;
  }

  ngOnInit() {
  }

}
