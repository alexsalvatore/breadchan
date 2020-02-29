import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/web.service';
import { Router } from '@angular/router';
import { ChanService } from 'src/app/services/chan.service';

@Component({
  selector: 'app-magic-token',
  templateUrl: './magic-token.component.html',
  styleUrls: ['./magic-token.component.css']
})
export class MagicTokenComponent implements OnInit {

  token : string = "";
  wip: boolean = false;

  constructor(private webService: WebService, private router:Router, private chanService:ChanService) {
    this.chanService.currentChanChanged("");
  }

  ngOnInit() {
  }

  onDownload(){
    this.wip = true;
    this.webService.getMagnet(this.token).subscribe(data_ =>{
      this.wip = false;
      if(!data_.result && !data_.result.length) return alert("There has been an error...");
      this.router.navigate(['/magnet/'+data_.result[0].board+'/'+data_.result[0].magnet]);
      
    })
  }
}
