import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  trigger('fadeInOut', [
      state('void', style({
        'opacity': 0
      })),
      state('*',   style({
        'opacity': 1
      })),
      transition('void <=> *', animate('0.3s ease-in-out'))
  ])
  ]
})
export class AppComponent {
	public showTip : Boolean = false;
	public tipContent : string;
	public offset : Boolean = false;
  public mainNav : Array<Object> = [
    {
      text: 'Home',
      route: '/home',
      subNav: []},
    {
      text: 'Projects',
      route: '',
      subNav: [
        {text: 'd3.js Game', route: '/projects/d3game', subNav: []},
        {text: 'Chinese-English Dictionary', route: '/projects/cedict', subNav: []},
        {text: 'Something Else', route: '/projects/sumelse', subNav: []}
      ]
    }
  ];
  public toggleTip : Function = function(bool, content, offset) {
	  console.log(content);
	  this.showTip = bool;
	  this.tipContent = content;
	  this.offset = offset;
  }

  constructor() {
  };
}
