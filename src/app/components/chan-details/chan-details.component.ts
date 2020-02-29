import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-chan-details',
  templateUrl: './chan-details.component.html',
  styleUrls: ['./chan-details.component.css']
})
export class ChanDetailsComponent implements OnInit {

  @Input() chanName : string = '';
  numFiles : number =0;
  sizeChan : number =0;

  constructor(private dbService : DbService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.dbService.getAllFilesForChanName(this.chanName).then((filesIndex: any) =>{
      this.numFiles = filesIndex.length;
      let sizeFinal = 0;
      filesIndex.forEach(fileIndex => {
        sizeFinal +=  Utils.getSizeInMo(Number.parseFloat(fileIndex.size));
      });
      this.sizeChan  = sizeFinal;
    });
  }

  ngOnChanges(changes: any) {
    if(changes.chanName != undefined){
      this.chanName = changes.chanName.currentValue;
      this.numFiles = 0;
      this.sizeChan = 0;
      this.loadData();
    }
  }

}
