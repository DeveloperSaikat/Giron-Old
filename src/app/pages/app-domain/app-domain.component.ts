import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthServicesService} from '../../shared/security/auth-services.service';

@Component({
  selector: 'app-app-domain',
  templateUrl: './app-domain.component.html',
  styleUrls: ['./app-domain.component.css']
})
export class AppDomainComponent implements OnInit {

  allDomainNames: any[] = [];

  constructor(private router: Router,
              private authService: AuthServicesService) {
  }

  ngOnInit(): void {
    this.authService.getDomains().subscribe(
      data => {
        this.allDomainNames = data;
        console.log(this.allDomainNames[0].name);
      }
    );
  }

}
