import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angular2-qrcode';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostingComponent } from './components/posting/posting.component';
import { StorageComponent } from './components/storage/storage.component';
import { MediaComponent } from './components/media/media.component';
import { TorrentComponent } from './components/torrent/torrent.component';
import { TorrentLeechingComponent } from './components/torrent-leeching/torrent-leeching.component';
import { TorrentDetailsComponent } from './components/torrent-details/torrent-details.component';
import { ChanListComponent } from './components/chan-list/chan-list.component';
import { ChanDetailsComponent } from './components/chan-details/chan-details.component';
import { TruncatePipe } from './utils/truncate-pipe';
import { HomeComponent } from './components/home/home.component';
import { MagicTokenComponent } from './components/magic-token/magic-token.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    PostingComponent,
    StorageComponent,
    MediaComponent,
    TorrentComponent,
    TorrentLeechingComponent,
    TorrentDetailsComponent,
    ChanListComponent,
    ChanDetailsComponent,
    TruncatePipe,
    HomeComponent,
    MagicTokenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
