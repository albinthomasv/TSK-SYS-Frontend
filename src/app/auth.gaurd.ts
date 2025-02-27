import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {

      if (localStorage.getItem(window.btoa('authToken'))) {

        return true;
      }
    }
    this.router.navigate(['/']); // Redirect to login if not authenticated
    return false;
  }
}
