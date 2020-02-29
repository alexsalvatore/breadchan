import Post from 'src/app/models/comment.model';
import {  EventEmitter } from '@angular/core';
import FileModel from 'src/app/models/file.model';
import {Md5} from 'ts-md5/dist/md5';
import { DbService } from '../services/db.service';
import CommentModel from 'src/app/models/comment.model';

export default class Utils {

    static postFile(file_: File, chanName_: string, torrentHash_: string, comment_:CommentModel, dbService: DbService, callback_: EventEmitter<any>) { 

        console.log(file_);
        //Save the file as binary
        let readerBinary = new FileReader();
        readerBinary.addEventListener("load", (e) => {

            let md5 = new Md5();
            let hash = md5.appendStr(readerBinary.result.toString()).end();
            //Record the file model
            let fileModel = new FileModel(hash, file_.name, chanName_, torrentHash_, file_.size, file_.type);
            fileModel.binary = readerBinary.result;
            dbService.addFile( fileModel, callback_);
            
            if(comment_){
                comment_.filehash = fileModel.hash;
                dbService.addComment( comment_, callback_);
            }

        }, false);

        readerBinary.readAsBinaryString(file_);
    }

    static getSizeInMo(sizeByte: number){
        return Math.round((sizeByte/1000000)*100)/100;
    }

    static isIOS(){
        let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(<any>window).MSStream;
        return iOS;
    }
}