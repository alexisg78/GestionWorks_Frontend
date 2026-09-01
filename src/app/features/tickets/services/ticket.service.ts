import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { TicketResponse } from '../interfaces/ticket-response.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);

  private _tickets = signal<TicketResponse[]>([]);
  readonly tickets = this._tickets.asReadonly();

  getTickets(): Observable<TicketResponse[]> {
    return this.http
      .get<TicketResponse[]>(`${baseUrl}/tickets`)
      .pipe(tap((tickets) => console.log(tickets)));
  }

  getTicket(id: number): Observable<TicketResponse> {
    return this.http
      .get<TicketResponse>(`${baseUrl}/tickets/${id}`)
      .pipe(tap((tickets) => console.log(tickets)));
  }
}
