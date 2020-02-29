export default class CommentModel{

    id : number;
    hash: string; //Hash of the comment to avoid double
    filehash : string;
    name : string;
    message : string;
    time : number;
  
    constructor(filehash_,name_, message_, time_){
      this.name = name_;
      this.filehash = filehash_;
      this.message = message_;
      this.time = time_;
      this.hash = time_;
    }
}