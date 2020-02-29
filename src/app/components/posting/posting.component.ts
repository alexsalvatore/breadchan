import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import CommentModel from 'src/app/models/comment.model';
import { DbService } from 'src/app/services/db.service';
import Utils from '../../utils/utils';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {

  modeUpload= 'file';
  nameText: string ='';
  commentText: string ='';
  urlFile: string ='';
  @Input() chanName: string;
  @Output() onPostSaved: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput: ElementRef;
  fileToUpload : any;
  fileListToUpload : any;

  constructor(private dbService:DbService) { 
  }

  ngOnInit() {
  }


  onFileInput(files: FileList) {

    this.fileListToUpload = files;
    /*
    //Took off the base64 reader to save memory
    let readerBase64URL = new FileReader();
    readerBase64URL.addEventListener("load", (e) => {
      this.post.url = readerBase64URL.result;
    }, false);
    readerBase64URL.readAsDataURL(this.fileToUpload);*/
  }

  onChangeUpload($event){
    this.modeUpload = $event.target.value;
    console.log( $event);
  }

  sendPost(){

   if(this.modeUpload ==='url'){
    var request = new XMLHttpRequest();
    request.open('GET', this.urlFile, true);
    request.responseType = 'blob';
    request.onload = () => {
        console.log(request.response)
        let filename =  this.urlFile.split("/").pop();
        this.fileToUpload = request.response;
        this.fileToUpload.name = filename;
        this.saveThePost();
    };
    request.send();
   } else {
    this.saveThePost();
   }

  }

  saveThePost() {

    /*
    let blog: BlogModel = new BlogModel();
    blog.name = this.blogName;*/
    let comment: CommentModel;

    if(this.commentText.length > 0){
      comment = new CommentModel(null,this.nameText,this.commentText, Math.floor(Date.now() / 1000))
    }

    //Save the file as binary
    if(this.modeUpload ==='url'){
      if(this.fileToUpload) Utils.postFile(this.fileToUpload, this.chanName, null , comment, this.dbService, this.onPostSaved);
    } else {
      if(this.fileListToUpload){
        for(let f = 0; f < this.fileListToUpload.length ; f++){
            let file = this.fileListToUpload.item(f);
            Utils.postFile(file, this.chanName, null, comment, this.dbService, this.onPostSaved);
        }
      }
    }

    //clean all
    this.urlFile ='';
    this.nameText ='';
    this.commentText ='';
    this.fileInput.nativeElement.value = null;
    this.fileToUpload = null;
    this.fileListToUpload = null;
  }

}
