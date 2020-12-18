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
export class LoginGuard implements CanActivate {
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
        console.log('Login guard');
        if (this.jwt) {
          return this.router.createUrlTree(['/trips']);
        }
        return true;
      })
      .catch((error) => {
        console.log(error);
        return true;
      });
  }
}
