import { Injectable } from '@angular/core';
import{Users} from  '../model/users';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
userlist:Users[]=[
  {username:'rahul',
  phone:'9527116327',
  email:'rahulmore0304@gmail.com'},
  {username:'pravin',
  phone:'9864852521',
  email:'pabhale2@gmail.com'},
  {username:'abhijit',
  phone:'9856254545',
  email:'abhijit@gmail.com'},
]
  newUser:Users;
  constructor() { }

  getUsers():Users[]{
    return this.userlist;
  }
  addUsers(Users){
    this.newUser={
      username:Users.username,
      phone:Users.phone,
      email:Users.email
    };
    this.userlist.push(this.newUser);
    
  }
}
