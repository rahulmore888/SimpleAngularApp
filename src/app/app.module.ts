import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import {UserserviceService} from './userservice/userservice.service';
import { Routes, RouterModule } from '@angular/router';
import { Approutes } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {NgPipesModule} from 'ngx-pipes';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BroadcasterService } from 'ng-broadcaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Approutes),
    // MaterialModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    FormsModule,
    NgPipesModule
  ],
  providers: [
  { provide: UserserviceService,
    },
       
],
  bootstrap: [AppComponent]
})
export class AppModule { }
