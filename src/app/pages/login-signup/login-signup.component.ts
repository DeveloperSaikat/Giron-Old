import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../shared/security/auth-services.service';
import { GironUserAuth } from '../../shared/models/user-auth';
import { GironUser } from '../../shared/models/user-data';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  securityObject: GironUserAuth = new GironUserAuth();
  returnUrl: string|null = '';

  constructor(private authService: AuthServicesService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  login(form: NgForm): void{
    if (form.valid){
      this.resetSecurityObject();
      const user = new GironUser(
        form.value.yourUserName,
        form.value.yourUserPassword,
        form.value.yourUser2FA
      );
      this.authService.login(user).subscribe(
        (resp) => {
          if (this.returnUrl){
            form.value.yourUserName = '';
            form.value.yourUserPassword = '';
            form.value.yourUser2FA = '';
            this.router.navigateByUrl(this.returnUrl);
            this.toastr.success('Login Successful', 'Success');
          }
          else{
            form.value.yourUserName = '';
            form.value.yourUserPassword = '';
            form.value.yourUser2FA = '';
            this.router.navigate(['/user/feed']);
            this.toastr.success('Login Successful', 'Success');
          }
        },
        (error) => {
          this.toastr.error('Wrong credentials', 'Error');
          // console.log(error);
        }
      );
    }
    else{
      this.toastr.error('Fill Username and Password', 'Error');
    }
  }

  resetSecurityObject(): void{
    this.securityObject.accessToken = '';
    this.securityObject.refreshToken = '';

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

}
