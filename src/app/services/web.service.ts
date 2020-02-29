import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  serverUrl: string;

  constructor( private http:HttpClient ) {
    this.serverUrl = environment.serverUrl;
  }

  getMagnet(token_){

    let body = new HttpParams();
    body = body.append('action', 'getMagnet');
    body = body.append('token', token_);
    return this.http.post<any>(this.serverUrl,body);

  }

  saveMagnet(magnet_,board_){

    let body = new HttpParams();
    body = body.append('action', 'saveMagnet');
    body = body.append('board', board_);
    body = body.append('magnet', magnet_);
    return this.http.post<any>(this.serverUrl,body);

  }
}
