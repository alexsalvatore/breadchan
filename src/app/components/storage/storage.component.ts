import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import Utils from '../../utils/utils';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  percentStorage: any = '???';
  moAvalaible: any = '???';
  moUsed: any = '???';

  constructor(private dbService: DbService) { }

  ngOnInit() {
    let strorage =  navigator.storage && navigator.storage.estimate ? navigator.storage.estimate() : undefined;
    strorage.then( result_ =>{
      console.log(result_);
      this.percentStorage = Math.round ((result_.usage / result_.quota) * 10000)/100;
      this.moAvalaible = Utils.getSizeInMo(result_.quota - result_.usage);
      this.moUsed = Utils.getSizeInMo(result_.usage);
    });
  }

  onClearStorage(){
    this.dbService.clearAll();
  }

}
