import { Component, OnInit, Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import FileModel from '../../models/file.model';
//import * as WebTorrent from '../../../assets/last.webtorrent.min.js'; 
import * as WebTorrent from 'node_modules/webtorrent/webtorrent.min.js'; 
import { Router, ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
import { ChanService } from 'src/app/services/chan.service';
import { environment } from 'src/environments/environment';
import { WebService } from 'src/app/services/web.service';


@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.css']
})
export class TorrentComponent implements OnInit {

  @HostListener('window:beforeunload', [ '$event' ])
  unloadHandler(e) {

    if(!this.torrent) return;
    //let confirmationMessage = "Hi! Looks like you're actualy sharing some torrent. If you close your page right now, your friend won't be able to download it. Are you sure you want to close it?";
    let confirmationMessage = "Looks like you're actualy sharing some torrent.";
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage;  
  }

  client;
  files : any[] = new Array();
  trackerURL1 : string = 'wss://tracker.novage.com.ua:443/announce';
  trackerURL2 : string = 'wss://tracker.openwebtorrent.com:443/announce';
  trackerURL3 : string = 'udp://denis.stalker.upeer.me:6969/announce';
  token : string = '';
  magnetURi : string  = '';
  blogUrl : string  = '';
  torrent : any;

  //Managing chan url
  currentChan : string = '';
  sharedChan : string;

  constructor(
    private dbService:DbService,
    private chanService:ChanService,
    private webServices:WebService,
    ) { }

  ngOnInit() {
    console.log(WebTorrent);
    //this.launchClient();
    this.chanService.onCurrentChanChanged.subscribe( chanName_ =>{
      this.currentChan = chanName_;
    })
  }

  launchClient(){
    if(this.client) this.client.destroy();
    this.client = new WebTorrent();
    this.sharedChan = this.currentChan;
    this.dbService.getAllFilesForChanName(this.sharedChan).then((files_: Array<FileModel>) => {

      if(!files_ || files_.length === 0) return;
      this.files = new Array();

      for(let f = 0; f < files_.length; f++ ){

        let file = files_[f];
        let binary = file.binary;
        let bytes = new Uint8Array(binary.length);
        for (var i=0; i<binary.length; i++)
            bytes[i] = binary.charCodeAt(i);
        
        let fullFile = new File([new Blob([bytes],{type: file.type})],file.name, {type: file.type});
        //console.log(fullFile);
        console.log('type:'+file.type);
        this.files.push( fullFile );
      }

      //Launch seeding!
      this.client.seed(this.files, {announceList:[[this.trackerURL3,this.trackerURL1,this.trackerURL2]]}, (torrent_) => {
      //this.client.seed(this.files, (torrent_) => {
        this.magnetURi = torrent_.magnetURI;
        this.blogUrl = environment.http+window.location.host+environment.clientUrl+'/magnet/'+this.sharedChan+'/'+btoa(torrent_.magnetURI);
        this.torrent = torrent_;
        console.log('Client is seeding:', torrent_.infoHash);

        //Get a token for this torrent
        this.webServices.saveMagnet(btoa(this.magnetURi),this.sharedChan).subscribe(data_ =>{
          if(!data_.result) return console.error("There has been an error...");
          
          if( data_.result.length ){
            this.token = data_.result[0].token;
          }  else {
            this.token = data_.result.token;
          }
           
        })
      })

    });
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
