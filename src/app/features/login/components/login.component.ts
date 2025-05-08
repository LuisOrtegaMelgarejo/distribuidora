import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../core/auth.service';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    imports: [SharedModule, ToastModule, Toast],
    providers: [MessageService]
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(
        private router: Router, 
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    login(): void {
        if (this.authService.login(this.username, this.password)) {
            this.router.navigate(['/admin']);
        } else {
            console.log('Login failed');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña invalidos', life: 3000 });
        }
    }
}
