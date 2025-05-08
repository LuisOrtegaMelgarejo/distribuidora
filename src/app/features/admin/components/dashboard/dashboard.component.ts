import { Component } from '@angular/core';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
    imports: []
})
export class AdminDashboardComponent {
    
    username: string = localStorage.getItem('username') || '';

    constructor() {}

}