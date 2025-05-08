import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list.component';
import { ProductEditComponent } from './components/product-edit.component';
import { ProductNewComponent } from './components/product-new.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: ProductListComponent,
    },
    {
        path: 'new',
        component: ProductNewComponent,
    },
    {
        path: 'edit/:id',
        component: ProductEditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}