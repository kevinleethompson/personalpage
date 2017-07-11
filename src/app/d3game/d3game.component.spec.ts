import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3gameComponent } from './d3game.component';

describe('D3gameComponent', () => {
  let component: D3gameComponent;
  let fixture: ComponentFixture<D3gameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3gameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3gameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
