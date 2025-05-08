import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // Using inject to get the HttpClient instance
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/productos';
    
    constructor() {}

    getProducts(): Promise<any> {
        return lastValueFrom(this.http.get<any>(this.apiUrl));
    }

    getProductById(id: string): Promise<any> {
        return lastValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`));
    }

    createProduct(product: any): Promise<any> {
        return lastValueFrom(this.http.post<any>(this.apiUrl, product));
    }

    updateProduct(id: string, product: any): Promise<any> {
        return lastValueFrom(this.http.put<any>(`${this.apiUrl}/${id}`, product));
    }

    deleteProduct(id: string): Promise<any> {
        return lastValueFrom(this.http.delete<any>(`${this.apiUrl}/${id}`));
    }
}