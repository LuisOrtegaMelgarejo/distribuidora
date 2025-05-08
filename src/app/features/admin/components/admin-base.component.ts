import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Menu } from 'primeng/menu';
import { Toast, ToastModule } from 'primeng/toast';
import { MenuItem, MessageService, SharedModule  } from 'primeng/api';
import { AuthService } from '../../../core/auth.service';

@Component({
    selector: 'admin-base',
    templateUrl: './admin-base.component.html',
    styleUrls: ['./admin-base.component.less'],
    imports: [Menu, ToastModule, Toast, RouterModule, SharedModule],
    providers: [MessageService]
})
export class AdminBaseComponent {
    
    items: MenuItem[] | undefined;

    constructor(
        private router: Router, 
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Menu',
                items: [
                    {
                        label: 'Inicio',
                        icon: 'pi pi-cog',
                        command: () => {
                            this.router.navigate(['/admin/dashboard']);
                        }
                    },
                    {
                        label: 'Clientes',
                        icon: 'pi pi-user',
                        command: () => {
                            this.router.navigate(['/admin/clients']);
                        }
                    },
                    {
                        label: 'Productos',
                        icon: 'pi pi-barcode',
                        command: () => {
                            this.router.navigate(['/admin/products']);
                        }
                    },
                    {
                        label: 'Pedidos',
                        icon: 'pi pi-clipboard',
                        command: () => {
                            this.router.navigate(['/admin/orders']);
                        }
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.messageService.add({ severity: 'info', summary: 'Logout', detail: 'Logging out...' });
                            this.authService.logout();
                            this.router.navigate(['/login']);
                        }
                    }
                ]
            }
        ];
    }
}