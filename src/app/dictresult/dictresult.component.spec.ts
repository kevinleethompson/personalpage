import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictresultComponent } from './dictresult.component';

describe('DictresultComponent', () => {
  let component: DictresultComponent;
  let fixture: ComponentFixture<DictresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
