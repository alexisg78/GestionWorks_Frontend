import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../core/http/api.config';
import { map, Observable } from 'rxjs';
import { Ticket, TicketResponse } from '../interfaces/ticket-response.interface';
import { TicketRequest } from '../interfaces/ticket-request.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/tickets`;

  // Devuelve solamente el array de tickets
  getTickets(): Observable<Ticket[]> {
    return this.http.get<TicketResponse>(this.endpoint).pipe(map((response) => response.tickets));
  }

  // Devuelve un ticket individual
  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.endpoint}/${id}`);
  }

  // Crea un ticket
  createTicket(data: TicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(this.endpoint, data);
  }

  // Actualiza un ticket
  updateTicket(id: string, data: TicketRequest): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.endpoint}/${id}`, data);
  }

  // Devuelve la respuesta paginada completa
  getTicketsResponse(limit: number, offset: number): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(this.endpoint, {
      params: {
        limit,
        offset,
      },
    });
  }
}
