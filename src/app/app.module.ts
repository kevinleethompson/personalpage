import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { D3Service } from 'd3-ng2-service';
import { DictQueryService } from './cedict/cedict.service';
import { VOALookupService } from './dictresult/dictresult.service';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { HomeComponent } from './home/home.component';
import { NavitemComponent } from './navitem/navitem.component';
import { NavComponent } from './nav/nav.component';
import { D3gameComponent } from './d3game/d3game.component';
import { CedictComponent } from './cedict/cedict.component';
import { DictresultComponent } from './dictresult/dictresult.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects/d3game', component: ServerComponent },
  { path: 'projects/cedict', component: CedictComponent },
  //{ path: 'projects/cedict/:searchTerm', component: CedictComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '*', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    HomeComponent,
    NavitemComponent,
    NavComponent,
    D3gameComponent,
    CedictComponent,
    DictresultComponent
  ],
  imports: [
    [ RouterModule.forRoot(appRoutes), BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule, JsonpModule]
  ],
  providers: [D3Service, DictQueryService, VOALookupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
