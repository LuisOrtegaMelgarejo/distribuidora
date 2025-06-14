import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../core/guards/login.guard';
import { LoginComponent } from './components/login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule {}