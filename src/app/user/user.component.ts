import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserserviceService } from '../userservice/userservice.service';
import { Users } from '../model/users';
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
newUser:Users;
existingusertable=true;
userAvailable=false;
addUserData=false;
searchformdata=false;
isAdd=false;

userslist:Users[];

datatable:Users[]=[ {username:'rahul',
phone:'888888888',
email:'rahul@gg.com'}  ];
rows: Users[];

  existinguser: Users[];
 
  constructor(private formBuilder: FormBuilder,
    private userService:UserserviceService,
    private filter: FilterByPipe,
    private changeDetectorRef: ChangeDetectorRef

  ) { 
    this.nameModel='';
    this.phoneModel='';
    this.emailModel='';   
    this.newUser=null;
   
  }
  searchuser: FormGroup;
  addForm:FormGroup;

  settings1 = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
    
      username: {
        title: 'User Name',
        filter:false
      },
      phone: {
        title: 'Phone',
        filter:false
      },
      email: {
        title: 'Email',
        filter:false
      }
    }
  };

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
    
      username: {
        title: 'User Name',
        filter:false
      },
      phone: {
        title: 'Phone',
        filter:false
      },
      email: {
        title: 'Email',
        filter:false
      }
    }
  };
  ngOnInit() {
/* using userservice gel list of user info
      ...................................................*/

    this.userslist=this.userService.getUsers();
    /* validating search form
      ...................................................*/
    this.searchuser = this.formBuilder.group({           
      phoneModel: ['', [Validators.required,Validators.minLength(10),Validators.pattern('[0-9]*$')]]
    });
  
    
   /* validating add form
      ...................................................*/
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.addForm = this.formBuilder.group({
      nameModel: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]*$')]],
      phoneModel: ['', [Validators.required, Validators.pattern('[0-9]*$'),Validators.minLength(10)]],
      emailModel: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]]
      });
      /* call user service method for get user info list
      ...................................................*/
    
  }

  get addFormData() { return this.addForm.controls; }

  get searchuserFormControls() { return this.searchuser.controls; }
  addUsers(){
   this.addUserData=true;  
    if (this.addForm.invalid) {
      return;
    }  
    this.addUserData=true;
    this.nameModel=this.addForm.value.nameModel;
    this.phoneModel=this.addForm.value.phoneModel;
    this.emailModel=this.addForm.value.emailModel;
            this.newUser={
              username:this.nameModel,
              phone:this.phoneModel,
              email:this.emailModel
            };    
            /* call User Service method for add userinfo 
            .............................................*/
      this.userService.addUsers(this.newUser);
      console.log(this.userslist.length);
      this.nameModel=this.phoneModel=this.emailModel='';
      this.isAdd=false;
      this.existingusertable=true;
      alert('user data added.   SUCCESS!! :-)\n\n' + JSON.stringify(this.addForm.value))
      //this.userslist=this.userService.getUsers();
    
  }



  onSubmit(event){
        event.preventDefault();
        this.userAvailable=false;    
        this.searchformdata=true;
  
          if (this.searchuser.invalid) {
            return;
          }
          this.searchformdata=true;
  
            this.phoneNuber=this.searchuser.value.phoneModel;
            console.log(this.phoneNuber);
          
        for(var i=0;i<this.userslist.length;i++){
                  if(this.phoneNuber===this.userslist[i].phone){
                      this.userAvailable=true;
                            this.newUser={
                              username:this.userslist[i].username,
                                  phone:this.userslist[i].phone,
                                  email:this.userslist[i].email
                            };
                  this.datatable.push(this.newUser);
                  }else{
                    this.isAdd=true; 
                }
          }
              this.rows = this.datatable.splice(1,1);
            
              if(this.userAvailable){
                this.isAdd=false;
                this.existingusertable=true;
              }
                if(this.isAdd){
                  this.userAvailable=false;
                  this.existingusertable=false;
                }
  //this.searchuser.reset();
}

}
