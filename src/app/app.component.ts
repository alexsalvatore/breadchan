import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Utils from './utils/utils';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bread-blog';
  isWorking = true;

  constructor(private dbService: DbService){
    
  }

  ngOnInit(){
    //Avoiding non HTTPS app launch!
    if (location.protocol != 'https:' && environment.production)
    {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }

    if(Utils.isIOS() /*|| !this.dbService.testDB()*/){
      this.isWorking = false;
      return;
    }
  }
  
}
