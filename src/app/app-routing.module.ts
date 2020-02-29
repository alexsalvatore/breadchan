import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { MagicTokenComponent } from './components/magic-token/magic-token.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'magnet/:channame/:magnet', component: BlogComponent},
  {path: 'ch/:channame', component: BlogComponent},
  {path: 'token', component: MagicTokenComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
