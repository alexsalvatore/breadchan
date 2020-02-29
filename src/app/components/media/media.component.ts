import { Component, OnInit, Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import FileModel from 'src/app/models/file.model';
import { DomSanitizer} from '@angular/platform-browser';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  @Input() url:any;
  @Input() preview:boolean = true;
  @Input() hash:string;
  @Input() heightMax:string;
  type: string = 'image';
  fileName : string;
  fileSize : string;
  blob;

  constructor(private dbService: DbService, private sanitizer:DomSanitizer) {}

  ngOnInit() {

    if(this.url) {
      
      console.log(this.url);
      if(this.url.indexOf('mp3') > -1 && this.url.indexOf('mp4')  === -1){
        this.type = 'music';
      } else if(this.url.indexOf('mp4') > -1){
        this.type = 'video';
      }

    } else if(this.hash){
      //Get the file from HASH
      this.dbService.getFileForHash(this.hash).first(file_ => {
        this.fileName = file_.name;
        this.fileSize = Utils.getSizeInMo(file_.size)+' Mo';

        let binary = file_.binary;
        let bytes = new Uint8Array(binary.length);
        for (var i=0; i<binary.length; i++)bytes[i] = binary.charCodeAt(i);

        this.blob = new Blob([bytes], {type: file_.type});
        let dataURLReader = new FileReader();
        dataURLReader.addEventListener("load", () => {
              // convert image file to base64 string
              this.url  = this.sanitizer.bypassSecurityTrustUrl(dataURLReader.result.toString());
              if(!file_.type) return;
              if(file_.type.indexOf('audio') > -1 && file_.type.indexOf('mp4') === -1){
                this.type = 'music';
              } else if(file_.type.indexOf('mp4')  > -1){
                this.type = 'video';
              }
         
        }, false);
        
        dataURLReader.readAsDataURL(this.blob);
      });
    } 
    
  }

  deleteFile(){
    this.dbService.deleteFileForHash(this.hash);
  }

  //https://stackoverflow.com/questions/36769419/saving-blob-as-xlsx-in-angular2
  saveFile(){
    /*
    this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.blob));
    console.log(window.URL.createObjectURL(this.blob));*/
    
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(this.blob, this.fileName);
    } else {
      const a = document.createElement('a');
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(this.blob);
      a.href = url;
      a.download = this.fileName;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0)
    }
  }

}
