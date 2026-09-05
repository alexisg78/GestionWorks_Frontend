import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/http/api.config';
import { Observable } from 'rxjs';
import { TicketResponse } from '../interfaces/ticket-response.interface';
import { TicketRequest } from '../interfaces/ticket-request.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/tickets`;

  getTickets(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(`${this.endpoint}`);
  }

  getTicket(id: number): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.endpoint}/${id}`);
  }

  createTicket(data: TicketRequest): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(this.endpoint, data);
  }

  updateTicket(id: number, data: TicketRequest): Observable<TicketResponse> {
    return this.http.patch<TicketResponse>(`${this.endpoint}/${id}`, data);
  }
}
