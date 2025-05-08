import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        return this.checkIsAlreadyLogin();
    }

    private checkIsAlreadyLogin(): boolean {
        if (this.authService.isAuthenticatedUser()) {
            this.router.navigate(['/admin']);
            return false;
        } else {
            return true;
        }
    }

}