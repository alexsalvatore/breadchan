import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Utils from '../../utils/utils';
import * as WebTorrent from 'node_modules/webtorrent/webtorrent.min.js';
//import * as WebTorrent from '../../../assets/last.webtorrent.min.js'; 
import { DbService } from 'src/app/services/db.service';
import Comment from 'src/app/models/comment.model';

@Component({
  selector: 'app-torrent-leeching',
  templateUrl: './torrent-leeching.component.html',
  styleUrls: ['./torrent-leeching.component.css']
})
export class TorrentLeechingComponent implements OnInit {

  @Input() chanName : string = '';
  @Input() magnetURI : string;
  @Output() onPostSaved: EventEmitter<any> = new EventEmitter<any>();

  //magnetURI: string;
  client: any;
  torrent: any;
  error: any;

  constructor(private dbService:DbService) { }

  ngOnInit() {
    this.launchClient();
  }

  launchClient(){

    //if( this.client ) this.client.destroy();
    this.client = new WebTorrent();

    //console.log(this.magnetURI);
    this.client.add(this.magnetURI, (torrent_)=>{

      console.log('------------');
      console.log(torrent_);
      this.torrent = torrent_;
      
      /*
      let blogModel = new BlogModel();
      blogModel.hash = torrent_.infoHash;
      blogModel.name = this.blogName;*/

      //if chan name doesn't exist we need to create if
      this.dbService.addChan(this.chanName,null);

      this.torrent.on('done', () => {

        //Get all files of the torrent
        this.torrent.files.forEach( (file_) => {
          console.log(file_)
          file_.getBlob( (err, blob) => {
            if(err) console.error(err)
            console.log(blob);
            
            Utils.postFile(new File([blob],file_.name,{type: blob.type}),
            this.chanName,
            this.torrent.infoHash,
            null,
            this.dbService,
            this.onPostSaved);
            //Utils.postFile(blob, post, this.dbService, this.onPostSaved );
          })
          

        }); 

      })
    });

    /*
    this.client.on('torrent', (torrent_)=>{
      this.torrent = torrent_;
     
    });*/

    this.client.on('error', (err_)=>{
      //console.log(torrent_);
      this.error = err_;
    });
  }


}
