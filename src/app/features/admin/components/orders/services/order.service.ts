import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    // Using inject to get the HttpClient instance
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/admin/pedidos';
    
    constructor() {}

    getOrders(): Promise<any> {
        return lastValueFrom(this.http.get<any>(this.apiUrl));
    }

    getOrderById(id: string): Promise<any> {
        return lastValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`));
    }

    createOrder(product: any): Promise<any> {
        return lastValueFrom(this.http.post<any>(this.apiUrl, product));
    }

    updateOrder(id: string, product: any): Promise<any> {
        return lastValueFrom(this.http.put<any>(`${this.apiUrl}/${id}`, product));
    }

    deleteOrder(id: string): Promise<any> {
        return lastValueFrom(this.http.delete<any>(`${this.apiUrl}/${id}`));
    }
}