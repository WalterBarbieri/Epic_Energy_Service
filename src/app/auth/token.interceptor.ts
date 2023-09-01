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



  intercept(request: HttpRequest<unknown>,
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
    return this.authService.user$.pipe(take(1), switchMap(user => {
        if (!user) {
            console.log(request);
            return next.handle(request);
        }

        const clonedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.accessToken}`
            }
          });
        return next.handle(clonedRequest);
    }));
  }
}
