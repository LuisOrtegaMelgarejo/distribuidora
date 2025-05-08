
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
    selector: 'order-form',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.less'],
    imports: [SharedModule, RouterModule]
})
export class OrderEditComponent implements OnInit {

    order!: any;
    originalName!: string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.order = {
            id: 1,
            code: 'SKU_1',
            name: 'Description 1',
            quantity: 100
        };
        this.originalName = this.order.name;
    }

    saveOrder() {
        // Logic to save the Order
        console.log('Order saved:', this.order);
        this.router.navigate(['admin/Orders']);
    }

    returnToList() {
        this.router.navigate(['admin/Orders']);
    }
}