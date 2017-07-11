import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
  trigger('navEnterLeave', [
      state('void', style({
        width: '0',
        height: '0',
        opacity: '0'
      })),
      state('*',   style({
        width: '*',
        height: '*',
        opacity: '1'
      })),
      transition('void <=> *', animate('0.3s ease-in-out'))
    ])
  ]
})
export class NavComponent implements OnInit {
  @Input() public nav: Array<Object>;

  constructor() {
  };

  ngOnInit() {
  }

}
