import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../shared/security/auth-services.service';
import { AllDomains } from '../../shared/models/all-domains';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {
  allDomainNames: any[] = [];

  constructor(private router: Router,
              private authService: AuthServicesService) { }

  ngOnInit(): void {
    this.authService.getDomains().subscribe(
      data => {
        this.allDomainNames = data;
        // console.log(this.allDomainNames[0].name);
      }
    );
  }


}
