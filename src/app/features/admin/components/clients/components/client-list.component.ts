import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../../../../shared/shared.module';
import { ClientService } from '../services/client.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.less'],
    imports: [TableModule, SharedModule, RouterModule],
    providers: [ClientService]
})
export class ClientListComponent implements OnInit {

    clients!: any[];

    constructor(
        private router: Router,
        private clientService: ClientService,
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        this.clients = await this.clientService.getClients();

    }

    editClient(id: number) {
        this.router.navigate(['admin/clients/edit', id]);
    }

    async deleteClient(id: number) {
        await this.clientService.deleteClient(id.toString());
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se eliminó el cliente correctamente', life: 3000 });
        this.clients = this.clients.filter(client => client.id !== id);
    }

    createClient() {
        this.router.navigate(['admin/clients/new']);
    }
}