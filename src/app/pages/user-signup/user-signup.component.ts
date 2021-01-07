import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../shared/security/auth-services.service';
import { UserSignup } from '../../shared/models/user-signup';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  userDetails = new UserSignup();

  constructor(private authService: AuthServicesService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void{
    if (form.valid){
      console.log(this.userDetails);
      this.authService.createUser(this.userDetails).subscribe(
        data => {
          this.toastr.success('User Created', 'Success');
          this.router.navigate(['/home/login']);
        },
        (error) => {
          if (error.status === 400){
            this.toastr.error('Username/Password not strong', 'Major Error');
          }
          else if (error.status === 403){
            this.toastr.error('Sorry Unknown', 'Major Error');
          }
        }
      );
    }
    else{
      this.toastr.error('Please make changes.', 'Major Error');
    }
  }

  /*
  submit(){
    console.log(this.userDetails);
    this.authService.createUser(this.userDetails).subscribe(
      data =>{
        console.log(data);
        this.router.navigate(['/home/login']);
      },
      (error) => {
        if(error.status === 400){
          this.notAuthorised = false;
          this.errorMessage =  "Username/Password is not strong...";
        }
        else if(error.status === 403){
          this.notAuthorised = false;
          this.errorMessage = "Oops!! You missed something...";
        }
      }
    )
  }*/

}
