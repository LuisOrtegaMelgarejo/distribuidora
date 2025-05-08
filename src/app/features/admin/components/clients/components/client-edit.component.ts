
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../../../../shared/shared.module';
import { ClientService } from '../services/client.service';

@Component({
    selector: 'client-form',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.less'],
    imports: [SharedModule, RouterModule],
    providers: [ClientService],
})
export class ClientEditComponent implements OnInit {

    client: any = {
        id: '',
        nombre: '',
        apellido: '',
        direccion: '',
        departamento: '',
        provincia: '',
        distrito: ''
    };
    originalName!: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private clientService: ClientService,
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar el cliente', life: 3000 });
            return;
        }
        this.client = await this.clientService.getClientById(id);
        this.originalName = this.client.name;
    }

    async saveClient() {
        if (!this.client.nombre || !this.client.apellido || !this.client.direccion || !this.client.departamento || !this.client.provincia || !this.client.distrito) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Por favor, complete todos los campos', life: 3000 });
            return;
        }
        const success = await this.clientService.updateClient(this.client.id, this.client);
        if (success) {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se editó el cliente correctamente', life: 3000 });
            this.router.navigate(['admin/clients']);
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar el cliente', life: 3000 });
        }
    }

    returnToList() {
        this.router.navigate(['admin/clients']);
    }
}