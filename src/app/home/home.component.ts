import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
  trigger('fadeSlideDown', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity: '0'
      })),
      state('*',   style({
        transform: 'translateY(0)',
        opacity: '1'
      })),
      transition(':enter', animate('0.3s ease-out'))
  ]),
  trigger('fadeSlideInLeft', [
      state('void', style({
        transform: 'translate(-50%)',
        opacity: '0'
      })),
      state('*',   style({
        transform: 'translate(0)',
        opacity: '1'
      })),
      transition(':enter', animate('0.5s ease-out'))
  ]),
  trigger('fadeSlideInRight', [
      state('void', style({
        transform: 'translate(50%)',
        opacity: '0'
      })),
      state('*',   style({
        transform: 'translate(0)',
        opacity: '1'
      })),
      transition(':enter', animate('0.5s ease-out'))
  ]),
  trigger('fadeIn', [
      state('void', style({
        opacity: '0'
      })),
      state('*',   style({
        opacity: '1'
      })),
      transition(':enter', animate('1s ease-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
