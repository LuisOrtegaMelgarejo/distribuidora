import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AdminBaseComponent } from './components/admin-base.component';
import { AdminDashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: AdminBaseComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            },
            {
                path: 'dashboard',
                component: AdminDashboardComponent,
            },
            {
                path: 'products',
                loadChildren: () => import('./components/products/products-routing.module').then(m => m.ProductRoutingModule),
            },
            {
                path: 'clients',
                loadChildren: () => import('./components/clients/clients-routing.module').then(m => m.ClientRoutingModule),
            },
            {
                path: 'orders',
                loadChildren: () => import('./components/orders/orders-routing.module').then(m => m.OrderRoutingModule),
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}