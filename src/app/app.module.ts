import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { UserLandingComponent } from './pages/user-landing/user-landing.component';
import { AuthServicesService } from './shared/security/auth-services.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/security/auth.guard';
import { HttpInterceptorModule } from './shared/security/http-interceptor';
import { DomainPageComponent } from './pages/domain-page/domain-page.component';
import { UserSignupComponent } from './pages/user-signup/user-signup.component';
import { UserNavComponent } from './pages/user-nav/user-nav.component';
import { AppNavComponent } from './pages/app-nav/app-nav.component';
import { DomainContentComponent } from './pages/domain-content/domain-content.component';
import { PostContentComponent } from './pages/post-content/post-content.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { AppDomainComponent } from './pages/app-domain/app-domain.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginSignupComponent,
    UserLandingComponent,
    DomainPageComponent,
    UserSignupComponent,
    UserNavComponent,
    AppNavComponent,
    DomainContentComponent,
    PostContentComponent,
    UserAccountComponent,
    AppDomainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpInterceptorModule,
    QRCodeModule,
    NgbModule
  ],
  providers: [AuthServicesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
