import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanListComponent } from './chan-list.component';

describe('ChanListComponent', () => {
  let component: ChanListComponent;
  let fixture: ComponentFixture<ChanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
