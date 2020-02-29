import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-torrent-details',
  templateUrl: './torrent-details.component.html',
  styleUrls: ['./torrent-details.component.css']
})
export class TorrentDetailsComponent implements OnInit {

  @Input('torrent') torrent: any;
  @Input('client') client: any;
  @Input('error') error;

  progress: any = 0;
  downloaded: any =0;
  time: any =0;

  constructor() { }

  ngOnInit() {

    let interval = setInterval( () => {
      if(this.torrent === undefined) return;
      this.progress = (this.torrent.progress * 100).toFixed(1);
      this.downloaded = this.torrent.downloaded;
      this.time = (this.torrent.timeRemaining / 1000);
    }, 1000);

    
  }

}
