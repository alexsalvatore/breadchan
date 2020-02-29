import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouteConfigLoadEnd ,RouteConfigLoadStart} from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { ChanService } from 'src/app/services/chan.service';
import * as magnet from 'node_modules/magnet-uri';
import FileModel from 'src/app/models/file.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogFileList : FileModel[] = [];
  magnet : string;
  chanName: string;
  @Output() chanChanged : EventEmitter<any> = new EventEmitter<any>();
  torrentHash: string;

  //Pagination
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  //routerSub : Subscription;

  constructor(
    private router: Router,
    private dbService: DbService,
    private route: ActivatedRoute,
    private chanService: ChanService) { }

  ngOnInit() {

    this.router.events.subscribe((event_) => {
      //console.log(event_ instanceof NavigationEnd) 
      //.pipe(filter(event => event instanceof NavigationEnd))
      //if(event_ instanceof RouteConfigLoadStart) this.updateFeed();
      if(event_ instanceof NavigationEnd) this.updateFeed();
    });
    this.updateFeed();
  }

  onPostSaved(event_){
    this.updateFeed();
  }

  updateFeed(){
    if(this.route.snapshot.paramMap.has('magnet')){
      this.magnet = atob(this.route.snapshot.paramMap.get('magnet'));
      this.chanName = this.route.snapshot.paramMap.get('channame');
      let parseMagnet = magnet.decode(this.magnet);
      this.torrentHash = parseMagnet.infoHash;
      this.dbService.getAllFilesIndexForTorretnHash(this.torrentHash).then(this.updateChanFileModel);

    } else if(this.route.snapshot.paramMap.has('channame')){
      this.chanName = this.route.snapshot.paramMap.get('channame');
      this.dbService.getAllFilesIndex(this.chanName).then(this.updateChanFileModel);
    } else {
      this.chanName = 'b';
      this.dbService.getAllFilesIndex(this.chanName).then(this.updateChanFileModel);
    }
    this.chanService.currentChanChanged( this.chanName );
  }

  updateChanFileModel = (chanFiles: Array<FileModel>) => {
    this.blogFileList = chanFiles.reverse();
  };

  deleteForHash(){
    this.dbService.deleteFileForTorrentHash(this.torrentHash).then(()=>{
      alert('Files deleted for InfoHash '+this.torrentHash);
    });
  }

  //Pagination
  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  /*
  ngOndestroy() {
    this.routerSub.remove(this.routerSub);
    this.elementRef.nativeElement.remove();
  }*/

}