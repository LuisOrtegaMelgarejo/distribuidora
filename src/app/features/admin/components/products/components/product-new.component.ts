
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../../../../shared/shared.module';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'product-form',
    templateUrl: './product-new.component.html',
    styleUrls: ['./product-new.component.less'],
    imports: [SharedModule, RouterModule],
    providers: [ProductService],
})
export class ProductNewComponent implements OnInit {

    product!: any;

    constructor(
        private router: Router,
        private productService: ProductService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.product = {
            nombre: '',
            descripcion: '',
            precio: 0
        };
    }

    async saveProduct() {
        if (this.product.nombre === '' || this.product.descripcion === '' || this.product.precio <= 0) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Por favor, complete todos los campos', life: 3000 });
            return;
        }
        const success = await this.productService.createProduct(this.product);
        if (success) {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se creó el producto correctamente', life: 3000 });
            this.router.navigate(['admin/products'])
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el producto', life: 3000 });
        }
    }

    returnToList() {
        this.router.navigate(['admin/products']);
    }
}