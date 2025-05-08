import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../../../../shared/shared.module';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.less'],
    imports: [TableModule, SharedModule, RouterModule],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {

    products!: any[];

    constructor(
        private router: Router,
        private productService: ProductService,
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        this.products = await this.productService.getProducts();
    }

    editProduct(id: number) {
        this.router.navigate(['admin/products/edit', id]);
    }

    async deleteProduct(id: number) {
        await this.productService.deleteProduct(id.toString());
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se eliminó el producto correctamente', life: 3000 });
        this.products = this.products.filter(product => product.id !== id);
    }

    createProduct() {
        this.router.navigate(['admin/products/new']);
    }
}