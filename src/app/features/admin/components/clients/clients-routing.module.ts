import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list.component';
import { ClientEditComponent } from './components/client-edit.component';
import { ClientNewComponent } from './components/client-new.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: ClientListComponent,
    },
    {
        path: 'new',
        component: ClientNewComponent,
    },
    {
        path: 'edit/:id',
        component: ClientEditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}