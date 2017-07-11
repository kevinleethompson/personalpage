import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-navitem',
  templateUrl: './navitem.component.html',
  styleUrls: ['./navitem.component.css'],
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
export class NavitemComponent implements OnInit {
  @Input() public text: string;
  @Input() public route: string;
  public openSubNav: boolean = false;
  public router : Router;
  @Input() public subNav: Array<Object>;
  public navClick: Function = function(e, button) {
    if (this.subNav.length > 0) {
      this.openSubNav = !this.openSubNav;
    } else {
      this.router.navigate([this.route]);
    }
  };

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
  }

}
