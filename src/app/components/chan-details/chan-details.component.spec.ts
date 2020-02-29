import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanDetailsComponent } from './chan-details.component';

describe('ChanDetailsComponent', () => {
  let component: ChanDetailsComponent;
  let fixture: ComponentFixture<ChanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
