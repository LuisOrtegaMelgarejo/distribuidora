import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    // Using inject to get the HttpClient instance
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/admin/clientes';
    
    constructor() {}

    getClients(): Promise<any> {
        return lastValueFrom(this.http.get<any>(this.apiUrl));
    }

    getClientById(id: string): Promise<any> {
        return lastValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`));
    }

    createClient(product: any): Promise<any> {
        return lastValueFrom(this.http.post<any>(this.apiUrl, product));
    }

    updateClient(id: string, product: any): Promise<any> {
        return lastValueFrom(this.http.put<any>(`${this.apiUrl}/${id}`, product));
    }

    deleteClient(id: string): Promise<any> {
        return lastValueFrom(this.http.delete<any>(`${this.apiUrl}/${id}`));
    }
}