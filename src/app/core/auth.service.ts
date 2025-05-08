import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;

    constructor() { 
        this.isAuthenticated = !!localStorage.getItem('token');
    }
  
    login(username: string, password: string): boolean {
        if (username === 'admin' && password === 'sherk') {
            localStorage.setItem('token', btoa(username+':'+password));
            this.isAuthenticated = true;
            return true;
        } else {
            return false;
        }
    }

    isAuthenticatedUser(): boolean {
        return this.isAuthenticated;
    }

    logout(): void {
        localStorage.removeItem('token');
        this.isAuthenticated = false;
    }
}