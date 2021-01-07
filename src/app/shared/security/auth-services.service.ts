import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { GironUserAuth } from '../models/user-auth';
import { GironUser } from '../models/user-data';
import { Observable } from 'rxjs';
import { DomainName } from '../models/domain-name';
import { Router } from '@angular/router';
import { RefreshToken } from '../models/refresh-token';
import { AllDomains } from '../models/all-domains';
import { UserSignup } from '../models/user-signup';
import { UserCreated } from '../models/user-created';
import { DomainPosts } from '../models/domain-posts';
import { NewPost } from '../models/new-post';
import { PostReturns } from '../models/post-returns';
import { CommentReturn } from '../models/comment-return';
import { PostComment } from '../models/post-comment';
import { ChangePassword } from '../models/change-password';
import { QrCode } from '../models/qr-code';
import { EnableTwoFactor } from '../models/enable-twofactor';
import { RecoveryCodes } from '../models/recovery-codes';


const API_URL = 'https://test.zubku.site';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  securityObject: GironUserAuth = new GironUserAuth();
  refreshToken: RefreshToken = new RefreshToken();

  constructor(private http: HttpClient,
              private router: Router) { }

  logout(token: any): Observable<HttpResponse<any>>{
    // console.log(token);
    this.router.navigate(['/home/login']);
    return this.http.delete(API_URL + '/sessions?RefreshToken=' + token, { observe: 'response' });
  }

  login(credentials: GironUser): Observable<GironUserAuth>{
    return this.http.post<GironUserAuth>(API_URL + '/sessions', credentials, httpOptions)
        .pipe(
          tap(data => {
            localStorage.setItem('username', credentials.username);
            Object.assign(this.securityObject, data);
            // console.log(this.securityObject.refreshToken);
            localStorage.setItem('accessToken', this.securityObject.accessToken);
            localStorage.setItem('refreshToken', this.securityObject.refreshToken);
          })
        );
  }

  createUser(newUser: UserSignup): Observable<UserCreated>{
    return this.http.post<UserCreated>(API_URL + '/users', newUser);
  }

  createPost(post: NewPost): Observable<DomainPosts>{
    return this.http.post<DomainPosts>(API_URL + '/posts', post);
  }

  likePost(postId: string): Observable<PostReturns>{
    return this.http.post<PostReturns>(API_URL + '/posts/' + postId + '/likes', null);
  }

  getPost(postId: string): Observable<PostReturns>{
    return this.http.get<PostReturns>(API_URL + '/posts/' + postId);
  }

  domainName(domain: DomainName): Observable<DomainName>{
    return this.http.post<DomainName>(API_URL + '/domains', domain);
  }

  getDomains(): Observable<AllDomains[]>{
    return this.http.get<AllDomains[]>(API_URL + '/domains', httpOptions);
  }

  getPostsOfADomain(dname: string): Observable<DomainPosts[]>{
    return this.http.get<DomainPosts[]>(API_URL + '/posts?DomainName=' + dname);
  }

  postComment(commentDetails: PostComment): Observable<CommentReturn>{
    return this.http.post<CommentReturn>(API_URL + '/comments', commentDetails);
  }

  changePassword(username: any, passwordDetails: ChangePassword): Observable<HttpResponse<any>>{
    return this.http.patch(API_URL + '/users/' + username + '/password', passwordDetails, { observe: 'response' });
  }

  check2FA(username: any): Observable<HttpResponse<any>>{
    return this.http.head(API_URL + '/users/' + username + '/2fa', { observe: 'response' });
  }

  generate2FAQR(username: any): Observable<QrCode>{
    return this.http.get<QrCode>(API_URL + '/users/' + username + '/2fa');
  }

  recoveryCodes(username: any, twoFactorDetails: EnableTwoFactor): Observable<RecoveryCodes>{
    return this.http.post<RecoveryCodes>(API_URL + '/users/' + username + '/2fa', twoFactorDetails);
  }

  getAccessToken(token: any) {
    // console.log(token);
    this.refreshToken.refreshToken = token;
    // console.log(token);
    return this.http.patch(API_URL + '/sessions', this.refreshToken).pipe(
      tap(data => {
        localStorage.removeItem('accessToken');
        Object.assign(this.securityObject, data);
        // console.log(this.securityObject)
        localStorage.setItem('accessToken', this.securityObject.accessToken);
      })
    );
  }


}
