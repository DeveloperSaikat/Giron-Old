import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppDomainComponent } from './pages/app-domain/app-domain.component';
import { AppNavComponent } from './pages/app-nav/app-nav.component';
import { DomainContentComponent } from './pages/domain-content/domain-content.component';
import { DomainPageComponent } from './pages/domain-page/domain-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { PostContentComponent } from './pages/post-content/post-content.component';
import { AuthGuard } from './shared/security/auth.guard';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { UserLandingComponent } from './pages/user-landing/user-landing.component';
import { UserNavComponent } from './pages/user-nav/user-nav.component';
import { UserSignupComponent } from './pages/user-signup/user-signup.component';
import { NoAuthGuard } from './shared/security/no-auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: AppNavComponent,
    children: [
      {
        path: '', redirectTo: 'welcome', pathMatch: 'full'
      },
      {
        path: 'welcome', component: LandingPageComponent
      },
      {
        path: 'alldomains', component: AppDomainComponent
      },
      {
        path: 'login', component: LoginSignupComponent
      },
      {
        path: 'signup', component: UserSignupComponent
      }
    ]
  },
  {
    path: 'user', component: UserNavComponent,
    children: [
      {
        path: 'feed', component: UserLandingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'domain', component: DomainPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'account', component: UserAccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':name', component: DomainContentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':name/:id', component: PostContentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '', redirectTo: 'feed', pathMatch: 'full'
      }
    ]
  },
  {
    path: '*', redirectTo: 'home/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
