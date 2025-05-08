import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list.component';
import { OrderEditComponent } from './components/order-edit.component';
import { OrderNewComponent } from './components/order-new.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: OrderListComponent,
    },
    {
        path: 'new',
        component: OrderNewComponent,
    },
    {
        path: 'edit/:id',
        component: OrderEditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderRoutingModule {}