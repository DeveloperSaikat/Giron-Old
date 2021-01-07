import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../shared/security/auth-services.service';
import { DomainName } from '../../shared/models/domain-name';

@Component({
  selector: 'app-domain-page',
  templateUrl: './domain-page.component.html',
  styleUrls: ['./domain-page.component.css']
})
export class DomainPageComponent implements OnInit {

  constructor(private authService: AuthServicesService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void{
      const domain = new DomainName(form.value.yourDomainName);
      // console.log(form.value.yourDomainName);
      this.authService.domainName(domain).subscribe(
        resp => {
          this.toastr.success('Domain Created', 'Success');
        },
        (error) => {
          if (error.status === 409){
            this.toastr.error('Domain already exists', 'Sorry');
          }
          else if (error.status === 400){
            this.toastr.error('Space/Special character not allowed', ' Error');
          }
        }
      );
  }

}
