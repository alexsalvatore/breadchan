import { Injectable } from '@angular/core';
import { EventEmitter} from '@angular/core';
import Dexie from 'dexie';
import FileModel from '../models/file.model';
import CommentModel from '../models/comment.model';
import { ChanService } from './chan.service';

const DB_NAME : string = 'BreadBlogDB';

@Injectable({
  providedIn: 'root'
})

export class DbService extends Dexie {

  constructor(private chanService:ChanService) {

    super(DB_NAME);
    this.initDB();
   
    /*
    this.table('posts').put({url:'https://pbs.twimg.com/media/EQa2arpW4AIj_sA?format=jpg&name=small',description:'Mototrola Razr'});
    this.table('posts').put({url:'https://pbs.twimg.com/media/EQbDmtxXkAEUIr2?format=jpg&name=small',description:'Rastan / PC / Taito / 1990'});
    this.table('posts').put({url:'https://pbs.twimg.com/media/EQbDmtxXkAEUIr2?format=jpg&name=small',description:'🐐 via 고갈왕 Gogalking @gogalking'});*/
  }

  initDB(){
    this.version(1).stores({
      comments: '++id,filehash,name,message,time',
      chans: '++id,&channame',
      filesindex: '++id,channame,filehash,size,torrenthash',
      files: '++id,&hash,binary,filename,channame,torrenthash,size',
    });
  }

  //Tets if we have acces to the db
  //Note: doesn't appear to work
   /*
  testDB(){
    try {
      // try to use localStorage
      localStorage.test = 2;        
    } catch (e) {
      // there was an error so...
      return false;
    }
   
    if(localStorage.test !== 2){
      return false;
    }

    return true;
  }*/


  /******************
   * CHANS
   *****************/
  addChan(chanName_, callback_: EventEmitter<any>){

    let regexpChan: RegExp = /[a-zA-Z0-9]$/;
    if(!regexpChan.test(chanName_)){
      console.error("Folder name not allowed.");
      return;
    }

    this.table('chans').where({channame: chanName_}).toArray().then(chanObj_=>{
      if(chanObj_ && chanObj_.length > 0){
        if(callback_) callback_.emit();
        return;
      }
      this.table('chans').put({channame:chanName_});
      this.chanService.chanListChanged(chanName_);
      if(callback_) callback_.emit();
    });
  }

  getAllChans(){
    return this.table('chans').toArray();
  }

  /******************
   * FILES INDEX
   *****************/
  
  addFileToIndex(chanName_:string ,filehash_:string,torrenthash_:string, size_, onCallback_: EventEmitter<any>){
    this.table('filesindex').where('filehash').equals(filehash_).toArray().then((filesindex_: Array<any>) => {
      if(filesindex_ && filesindex_.length > 0){
        if(onCallback_) onCallback_.emit();
        return;
      }  
      this.table('filesindex').put({filehash: filehash_, channame: chanName_, size:size_, torrenthash: torrenthash_});
      if(onCallback_) onCallback_.emit();
    });
  }

  deleteFileToIndex(filehash_:string, onCallback_: EventEmitter<any>){
    return this.table('filesindex').where({filehash: filehash_}).delete();
  }

  getAllFilesIndex(channame_){
    if(channame_ !== '' && channame_ !== 'b') return this.table('filesindex').where({channame: channame_}).toArray();
    return this.table('filesindex').where({channame: ''}).or('channame').equals('b').toArray();
  }

  getAllFilesIndexForTorretnHash(torrentHash_){
    return this.table('filesindex').where({torrenthash: torrentHash_}).toArray();
  }

  /******************
   * FILES
   *****************/

  addFile(file_: FileModel, onFileSaved_: EventEmitter<any>){
    this.table('files').where('hash').equals(file_.hash).toArray().then((files_: Array<FileModel>) => {
      if(files_ && files_.length > 0){
        if(onFileSaved_) onFileSaved_.emit();
        return;
      }  
      this.table('files').put({hash:file_.hash, channame: file_.chanName, torrenthash: file_.torrentHash, name:file_.name,binary: file_.binary, type: file_.type, size: file_.size});
      this.addFileToIndex(file_.chanName, file_.hash, file_.torrentHash, file_.size, onFileSaved_);
    });
  }

  getFileForHash(hash_: string){
    return this.table('files').where({hash: hash_});
  }

  getAllFilesForChanName(channame_){

    if(channame_ !== '' && channame_ !== 'b') return this.table('files').where({channame: channame_}).toArray()
    return this.table('files').where({channame: ''}).or('channame').equals('b').toArray()
  }

  getAllFilesForTorretnHash(torrentHash_){
    return this.table('files').where({torrenthash: torrentHash_}).toArray()
  }

  deleteFileForTorrentHash(torrenthash_: string){

    this.table('filesindex').where({torrenthash: torrenthash_}).delete();
    return this.table('files').where({torrenthash: torrenthash_}).delete();
  }

  deleteFileForHash(hash_: string){

    this.table('filesindex').where({filehash: hash_}).delete();
    return this.table('files').where({hash: hash_}).delete();
    
  }

  getAllFiles(){
    return this.table('files').toArray();
  }

  /******************
   * COMMENTS
   *****************/

  addComment(comment_:CommentModel, onCommentSaved_: EventEmitter<any>){
    this.table('comments').where({hash: comment_.hash}).toArray().then((comments_: Array<CommentModel>) => {
      if(comments_ && comments_.length > 0){
        if(onCommentSaved_)onCommentSaved_.emit();
        return;
      } 
      this.table('comments').put({hash:comment_.hash, name:comment_.name,message: comment_.message, time: comment_.time});
      if(onCommentSaved_) onCommentSaved_.emit();
    });
  }

  getCommentsForFileHash(filehash_: string){
    return this.table('comments').where({filehash: filehash_});
  }

  /******************
   * OTEHRS
   *****************/

  clearAll(){
    Dexie.delete(DB_NAME);
    this.initDB();
  }
}
