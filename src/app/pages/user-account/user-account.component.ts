import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../shared/security/auth-services.service';
import { ChangePassword } from '../../shared/models/change-password';
import { EnableTwoFactor } from '../../shared/models/enable-twofactor';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  passwordDetails: ChangePassword = new ChangePassword();
  passwordChange = false;
  twoFactorEnabled = false;
  username: any = localStorage.getItem('username');
  qrcodeGenerated = false;
  qrString = '';
  twoFactorRequirements: EnableTwoFactor = new EnableTwoFactor();
  recoveryCodes: any[] = [];
  confirmPassword = '';

  constructor(private authService: AuthServicesService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.check2FA(this.username).subscribe(
      data => {
        if (data.status === 200){
          this.twoFactorEnabled = true;
        }
      }
    );
  }

  changePassword(form: NgForm): void{
    if (form.valid){
      if (this.passwordDetails.newPassword === this.confirmPassword){
        this.authService.changePassword(this.username, this.passwordDetails).subscribe(
          data => {
            console.log(data);
            this.toastr.success('Password Changed', 'Success');
          },
          (error) => {
            if (error.status === 400){
              this.toastr.error('Entered wrong password', 'Error');
            }
          }
        );
      }
      else{
        this.toastr.error('Passwords don\'t match', 'Error');
      }
    }
    else{
      this.toastr.error('Fill all fields', 'Error');
    }
  }

  enable2fa(): void{
    this.authService.generate2FAQR(this.username).subscribe(
      data => {
        // console.log(data.authenticatorKey);
        this.qrcodeGenerated = true;
        this.qrString = 'otpauth://totp/' + this.username + '?secret=' + data.authenticatorKey;
      }
    );
  }

  getRecoveryCodes(form: NgForm): void{
    if (form.valid){
      this.authService.recoveryCodes(this.username, this.twoFactorRequirements).subscribe(
        data => {
          this.recoveryCodes = data.recoveryCodes;
        }
      );
    }
    else{
      this.toastr.error('Fill all fields', 'Error');
    }

  }

}
