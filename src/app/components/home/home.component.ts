import { Component, OnInit } from '@angular/core';
import { ChanService } from 'src/app/services/chan.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chanList: any[] = [];

  constructor(private chanService: ChanService, private dbService:DbService) { }

  ngOnInit() {
    this.chanService.currentChanChanged("");
    this.dbService.getAllChans().then( chans_ => {
      this.chanList = chans_;
    });
  }

}
