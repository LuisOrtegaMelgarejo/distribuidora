
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../../../../../shared/shared.module';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'product-form',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.less'],
    imports: [SharedModule, RouterModule],
    providers: [ProductService]
})
export class ProductEditComponent implements OnInit {

    product = {
        id: '',
        nombre: '',
        precio: 0,
        descripcion: ''
    }
    originalName!: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar el producto', life: 3000 });
            return;
        }
        this.product = await this.productService.getProductById(id);
        this.originalName = this.product.nombre;
    }

    async saveProduct() {
        if (!this.product.nombre || !this.product.precio || !this.product.descripcion) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Por favor, complete todos los campos', life: 3000 });
            return;
        }
        const success = await this.productService.updateProduct(this.product.id, this.product);
        if (success) {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se editó el producto correctamente', life: 3000 });
            this.router.navigate(['admin/products'])
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar el producto', life: 3000 });
        }
    }

    returnToList() {
        this.router.navigate(['admin/products']);
    }
}