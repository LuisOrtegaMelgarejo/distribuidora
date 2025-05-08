
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../../../../shared/shared.module';
import { ClientService } from '../services/client.service';

@Component({
    selector: 'client-form',
    templateUrl: './client-new.component.html',
    styleUrls: ['./client-new.component.less'],
    imports: [SharedModule, RouterModule],
    providers: [ClientService]
})
export class ClientNewComponent implements OnInit {

    client!: any;

    constructor(
        private router: Router,
        private clientService: ClientService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.client = {
            id: '',
            nombre: '',
            apellido: '',
            direccion: '',
            departamento: '',
            provincia: '',
            distrito: ''
        };
    }

    async saveClient() {
        if (
            this.client.nombre === '' || 
            this.client.apellido === '' || 
            this.client.direccion === '' || 
            this.client.departamento === '' || 
            this.client.provincia === '' || 
            this.client.distrito === ''
        ) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Por favor, complete todos los campos', life: 3000 });
            return;
        }
        const success = await this.clientService.createClient(this.client);
        if (success) {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se creó el cliente correctamente', life: 3000 });
            this.router.navigate(['admin/clients']);
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el cliente', life: 3000 });
        }
    }

    returnToList() {
        this.router.navigate(['admin/clients']);
    }
}