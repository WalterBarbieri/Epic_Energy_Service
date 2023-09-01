import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

    constructor(private authService: AuthServiceService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree>
    | Promise<boolean
    | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user$.pipe(
        take(1),
        map(user => {
            if (user){
                return true;
            }
            alert(
                'per visualizzare questo contenuto devi essere loggato \nAccedi oppure Registrati'
            );
            return this.router.createUrlTree(['/login']);
        })
    );
  }

}
