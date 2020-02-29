import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentLeechingComponent } from './torrent-leeching.component';

describe('TorrentLeechingComponent', () => {
  let component: TorrentLeechingComponent;
  let fixture: ComponentFixture<TorrentLeechingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorrentLeechingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentLeechingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
