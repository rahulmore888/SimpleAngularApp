import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserserviceService } from '../userservice/userservice.service';
import { Users } from './users';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgPipesModule, FilterByPipe} from 'ngx-pipes';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [FilterByPipe,UserserviceService]
})
export class UserComponent implements OnInit {

nameModel:String;
phoneModel:String;
emailModel:String;
phoneNuber:String;
mobileModel:String;
newUser:Users;
existingusertable=true;
userAvailable=false;
searchPhoneNumber=true;
addUserData=false;
searchformdata=false;
isAdd=false;
search:String[];
userslist:Users[];
//datatable:Users[];
datatable:Users[]=[ {username:'rahul',
phone:'888888888',
email:'rahul@gg.com'}  ];
rows: Users[];
  tabledata: any;
  existinguser: Users[];
  comparrePhone: String;
  constructor(private formBuilder: FormBuilder,
    private userService:UserserviceService,
    private filter: FilterByPipe,
    private changeDetectorRef: ChangeDetectorRef

  ) { 
    this.nameModel='';
    this.phoneModel='';
    this.emailModel='';
    this.mobileModel='';
    this.newUser=null;
    
   // this.userslist=userService.getUsers();
  }
  searchuser: FormGroup;
  addForm:FormGroup;

  settings1 = {
    columns: {
    
      username: {
        title: 'User Name'
      },
      phone: {
        title: 'Phone'
      },
      email: {
        title: 'Email'
      }
    }
  };

  settings = {
    columns: {
    
      username: {
        title: 'User Name'
      },
      phone: {
        title: 'Phone'
      },
      email: {
        title: 'Email'
      }
    }
  };
  ngOnInit() {
    this.searchuser = this.formBuilder.group({           
      phoneModel: ['', [Validators.required,Validators.minLength(10),Validators.pattern('[0-9]*$')]]
    });
  
    
    this.userslist=this.userService.getUsers();
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.addForm = this.formBuilder.group({
      nameModel: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*$')]],
      phoneModel: ['', [Validators.required, Validators.pattern('[0-9]*$'),Validators.minLength(10)]],
      emailModel: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]]
      });

  }

  get addFormData() { return this.addForm.controls; }

  get searchuserFormControls() { return this.searchuser.controls; }
  addUsers(){

   this.addUserData=true;
    this.searchPhoneNumber=true;
    if (this.addForm.invalid) {
      return;
    }
    this.searchPhoneNumber=true;
    this.addUserData=true;
    this.nameModel=this.addForm.value.nameModel;
    this.phoneModel=this.addForm.value.phoneModel;
    this.emailModel=this.addForm.value.emailModel;
     this.newUser={
      username:this.nameModel,
      phone:this.phoneModel,
      email:this.emailModel
    };
    this.userslist.push(this.newUser);
    console.log(this.userslist.length);
    this.nameModel=this.phoneModel=this.emailModel='';
  //  this.toastr.success('User data add successfully!', 'Success!');
  this.isAdd=false;
  this.existingusertable=true;
  alert('user data added.   SUCCESS!! :-)\n\n' + JSON.stringify(this.addForm.value))
  }
  onSubmit(event){

    event.preventDefault();
    this.userAvailable=false;
    //this.searchuser.reset();
    this.searchformdata=true;
    this.searchPhoneNumber=true;
    if (this.searchuser.invalid) {
      return;
    }
    this.searchformdata=true;
    this.searchPhoneNumber=true;
    this.phoneNuber=this.searchuser.value.phoneModel;
    console.log(this.phoneNuber);
  
 for(var i=0;i<this.userslist.length;i++){
 
 console.log(this.userslist[i].phone);
 if(this.phoneNuber===this.userslist[i].phone){
  this.userAvailable=true;
this.newUser={
  username:this.userslist[i].username,
      phone:this.userslist[i].phone,
      email:this.userslist[i].email
};
   
this.datatable.push(this.newUser);
console.log(this.datatable.length)

 }else{
   
  this.isAdd=true;
 
 }
  }
  this.rows = this.datatable.splice(1,1);
  console.log(this.rows.length);
  if(this.userAvailable){
    this.isAdd=false;
    this.existingusertable=true;
  }
  if(this.isAdd){
    this.userAvailable=false;
    this.existingusertable=false;
  }
  this.searchuser.reset();
}

}
