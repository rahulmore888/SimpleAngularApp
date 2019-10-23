import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';

export const Approutes: Routes = [
  { path: '', redirectTo:'user', pathMatch:'full'},

    { path: 'user', component: UserComponent },
    {path: '**', redirectTo: 'user', pathMatch: 'full'}
 
  ];
  export const routing = RouterModule.forRoot(Approutes);