import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Security } from '../utils/security.util';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        const token = Security.getToken();
        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}