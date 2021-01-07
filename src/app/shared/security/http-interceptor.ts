import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { empty, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthServicesService } from './auth-services.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{

    constructor(private authService: AuthServicesService){}

    isRefreshing = false;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      // tslint:disable-next-line:no-shadowed-variable
        let request = this.addAuthHeader(req);

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // console.log(error.status);

                if (error.status === 401 && !this.isRefreshing){
                    // console.log("inside 401");
                    return this.refreshAccessToken().pipe(
                        switchMap(() => {
                          request = this.addAuthHeader(request);
                          return next.handle(request);
                        }),
                        catchError((err: any) => {
                            if (err.status === 401){
                                const token = localStorage.getItem('refreshToken');
                                this.authService.logout(token);
                            }
                            // console.log("gotcha");
                            return throwError(err);
                        })
                    );
                  }

                return throwError(error);
            })
        );
    }


    addAuthHeader(request: HttpRequest<any>): HttpRequest<any>{
        const token = localStorage.getItem('accessToken');
        // console.log("in add auth");
        if (token){
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // console.log(request);
        return request;
    }

    refreshAccessToken(){
        // console.log("in refresh");
        this.isRefreshing = true;
        const token = localStorage.getItem('refreshToken');
        return this.authService.getAccessToken(token).pipe(
            tap(() => {
                // console.log("Trying to Refresh");
                this.isRefreshing = false;
                // console.log("Refreshed");
            })
        );
    }
}



@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        }
    ]
})

export class HttpInterceptorModule {}
