
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../../../../shared/shared.module';
import { ClientService } from '../../clients/services/client.service';
import { ProductService } from '../../products/services/product.service';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'order-form',
    templateUrl: './order-new.component.html',
    styleUrls: ['./order-new.component.less'],
    imports: [SharedModule, RouterModule, TableModule]
})
export class OrderNewComponent implements OnInit {

    clientes!: any[];
    productos!: any[];
    selectedItems: any[] = [];
    selectedClient: any = {};

    constructor(
        private router: Router,
        private clientService: ClientService,
        private productService: ProductService,
        private messageService: MessageService,
        private orderService: OrderService
    ) {}

    async ngOnInit() {
        await Promise.all([this.productService.getProducts(), this.clientService.getClients()]).then((res) => {
            this.productos = res[0];
            this.clientes = res[1].map((client: any) => {
                return {
                    label: client.nombre + ' ' + client.apellido,
                    ...client
                };
            });
        });
    }

    addItem() {
        this.selectedItems.push({
            producto: {},
            cantidad: 1,
        });
    }

    deleteItem(index: number) {
        this.selectedItems.splice(index, 1);
    }

    async saveorder() {
        if (this.selectedClient.id === undefined) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay cliente seleccionado' });
            return;
        }
        if (this.selectedItems.length === 0) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay productos agregados' });
            return;
        }
        if (this.selectedItems.some((item) => item.cantidad === undefined || item.cantidad <= 0 || item.producto.id === undefined)) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hay lineas sin cantidad o sin producto' });
            return;
        }
        const success = await this.orderService.createOrder({
            clienteId: this.selectedClient.id,
            fechaPedido: new Date(),
            detalles: this.selectedItems.map((item) => {
                return {
                    productoId: item.producto.id,
                    cantidad: item.cantidad,
                    precioUnitario: item.producto.precio,
                };
            }).reduce((acc: any[], item: any) => {
                const existingItem = acc.find((i) => i.productoId === item.productoId);
                if (existingItem) {
                    existingItem.cantidad += item.cantidad;
                } else {
                    acc.push(item);
                }
                return acc;
            }, []) });
        if (success) {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Pedido creado' });
            this.router.navigate(['admin/orders']);
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el pedido' });
        }
    }

    returnToList() {
        this.router.navigate(['admin/orders']);
    }
}