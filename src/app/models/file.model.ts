export default class FileModel{

    id : number;
    hash : any;
    binary : any;
    name : string;
    type : string;
    size : number;
    chanName : string;
    torrentHash : string;
  
    constructor(hash_, name_, chanName_,torrentHash_, size_, type_){
  
      this.hash = hash_;
      this.name = name_;
      this.chanName = chanName_;
      this.torrentHash = torrentHash_
      this.size = size_;
      this.type = type_;
      
    }
  }