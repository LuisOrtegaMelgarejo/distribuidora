import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../../../../shared/shared.module';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.less'],
    imports: [TableModule, SharedModule, RouterModule],
    providers: [OrderService]
})
export class OrderListComponent implements OnInit {

    orders!: any[];

    constructor(
        private router: Router,
        private orderService: OrderService
    ) {}

    async ngOnInit() {
        this.orders = (await this.orderService.getOrders()).map((order: any) => {
            order.descripcion = order.detalles.map((detalle: any) => detalle.cantidad + ' ' + detalle.producto.nombre).join(', ');
            if (order.descripcion.length > 50) {
                order.descripcion = order.descripcion.substring(0, 50) + '...';
            }
            order.total = order.detalles.reduce((total: number, detalle: any) => {
                return total + (detalle.cantidad * detalle.precioUnitario);
            }, 0);
            return order;
        });
    }

    editOrder(id: number) {
        this.router.navigate(['admin/orders/edit', id]);
    }

    deleteOrder(id: number) {
        this.orders = this.orders.filter(Order => Order.id !== id);
    }

    createOrder() {
        this.router.navigate(['admin/orders/new']);
    }
}