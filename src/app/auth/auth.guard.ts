import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  public jwt: string;
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    status: RouterStateSnapshot
  ):
    | boolean
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | UrlTree {
    return Auth.currentSession()
      .then((res) => {
        let idtoken = res.getIdToken();
        this.jwt = idtoken.getJwtToken();
        console.log('Auth guard');
        if (this.jwt) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
      .catch((error) => {
        console.log(error);
        return this.router.createUrlTree(['/auth']);
      });
  }
}
