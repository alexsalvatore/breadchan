import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicTokenComponent } from './magic-token.component';

describe('MagicTokenComponent', () => {
  let component: MagicTokenComponent;
  let fixture: ComponentFixture<MagicTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagicTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
