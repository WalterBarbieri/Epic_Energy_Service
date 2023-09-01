import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService) {}

  newReq! : HttpRequest<any>;

  intercept(request: HttpRequest<unknown>,
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
    return this.authService.user$.pipe(take(1), switchMap(user => {
        if (!user) {
            console.log(request);
            console.log(this.newReq);
            return next.handle(request);
        }

        this.newReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${user.accessToken}`)
        });

        console.log(request);
        console.log(this.newReq);
        return next.handle(this.newReq);
    }));
  }
}
