import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RefreshToken } from '../../shared/models/refresh-token';
import { GironUserAuth } from '../../shared/models/user-auth';
import { AuthServicesService } from '../../shared/security/auth-services.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  securityObject: GironUserAuth = new GironUserAuth();
  username: string| null = localStorage.getItem('username');
  constructor(private authService: AuthServicesService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout(localStorage.getItem('refreshToken')).subscribe(
      resp => {
        if (resp.status === 204){
        this.toastr.success('Logged out successfully', 'Success');
        this.resetSecurityObject();
        }
      },
      (error) => {
        if (error.status === 400){
          this.toastr.error('Oops something is wrong..', 'Sorry');
        }
      }
    );
  }

  resetSecurityObject(): void{
    this.securityObject.accessToken = '';
    this.securityObject.refreshToken = '';

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

}
