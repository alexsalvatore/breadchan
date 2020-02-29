import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DbService } from 'src/app/services/db.service';
import { ChanService } from 'src/app/services/chan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chan-list',
  templateUrl: './chan-list.component.html',
  styleUrls: ['./chan-list.component.css']
})

export class ChanListComponent implements OnInit {

  chanList: any[] = ['b'];
  closeResult: any;
  newChanName: string;
  isCollapsed = true;

  constructor(
    private chanService:ChanService,
    private modalService: NgbModal,
    private dbService:DbService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.chanService.onChanListChanged.subscribe(e => {
      this.updateChanList();
    })
    this.updateChanList();
  }

  addChan(content){
    /*
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'chanMaker';*/
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
      let regexpChan: RegExp = /[a-zA-Z0-9]$/;
      if(!regexpChan.test(this.newChanName)){
        alert("You cannot use space or special characters in a folder's name.");
        this.newChanName = "";
        return;
      }

      //Add the chan
      this.dbService.addChan(this.newChanName,null);
      //redirect to this chan
      alert('/'+this.newChanName+' has been created. You will be automatically redirected to this folder.');
      this.router.navigate(['/ch/'+this.newChanName]);
    });
  }

  updateChanList(){
    this.dbService.getAllChans().then( chansObj =>{
          this.chanList = [];
          if(chansObj.length > 0){
            chansObj.forEach(chan => {
              this.chanList.push(chan.channame);
            });
          } else {
            this.dbService.addChan('b',null);
          }
    })
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }
}
