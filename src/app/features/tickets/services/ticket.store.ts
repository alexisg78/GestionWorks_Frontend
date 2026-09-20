import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';

import { TicketResponse } from '../interfaces/ticket-response.interface';
import { TicketRequest } from '../interfaces/ticket-request.interface';
import { TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root',
})
export class TicketStore {
  private readonly ticketService = inject(TicketService);

  // ============================================================
  // STATE
  // ============================================================

  private readonly ticketsState = signal<Map<string, TicketResponse>>(new Map());

  private readonly ticketsLoadedState = signal(false);

  // ============================================================
  // PUBLIC STATE
  // ============================================================

  readonly tickets = computed(() => Array.from(this.ticketsState().values()));

  readonly ticketsLoaded = this.ticketsLoadedState.asReadonly();

  // ============================================================
  // IN-FLIGHT REQUESTS
  // ============================================================

  private ticketsRequest$?: Observable<TicketResponse[]>;

  private readonly ticketRequests = new Map<string, Observable<TicketResponse>>();

  // ============================================================
  // QUERIES
  // ============================================================

  loadTickets(): Observable<TicketResponse[]> {
    /*
     * Ya tenemos los tickets en memoria.
     */
    if (this.ticketsLoadedState()) {
      return of(this.tickets());
    }

    /*
     * Ya existe una petición en curso.
     * Reutilizamos la misma petición.
     */
    if (this.ticketsRequest$) {
      return this.ticketsRequest$;
    }

    const request$ = this.ticketService.getTickets().pipe(
      tap((tickets) => {
        this.setTickets(tickets);
        this.ticketsLoadedState.set(true);
      }),

      finalize(() => {
        this.ticketsRequest$ = undefined;
      }),

      shareReplay({
        bufferSize: 1,
        refCount: false,
      }),
    );

    this.ticketsRequest$ = request$;

    return request$;
  }

  getTicket(id: string): Observable<TicketResponse> {
    /*
     * 1. Buscamos primero en el store.
     */
    const cachedTicket = this.ticketsState().get(id);

    if (cachedTicket) {
      return of(cachedTicket);
    }

    /*
     * 2. Ya existe una petición para este ticket.
     */
    const existingRequest = this.ticketRequests.get(id);

    if (existingRequest) {
      return existingRequest;
    }

    /*
     * 3. No tenemos el ticket → hacemos HTTP.
     */
    const request$ = this.ticketService.getTicket(id).pipe(
      tap((ticket) => {
        this.setTicket(ticket);
      }),

      finalize(() => {
        this.ticketRequests.delete(id);
      }),

      shareReplay({
        bufferSize: 1,
        refCount: false,
      }),
    );

    this.ticketRequests.set(id, request$);

    return request$;
  }

  // ============================================================
  // MUTATIONS
  // ============================================================

  createTicket(data: TicketRequest): Observable<TicketResponse> {
    return this.ticketService.createTicket(data).pipe(
      tap((ticket) => {
        this.setTicket(ticket);
      }),
    );
  }

  updateTicket(id: string, data: TicketRequest): Observable<TicketResponse> {
    return this.ticketService.updateTicket(id, data).pipe(
      tap((ticket) => {
        this.setTicket(ticket);
      }),
    );
  }

  // ============================================================
  // CACHE / STORE MANAGEMENT
  // ============================================================

  refreshTickets(): Observable<TicketResponse[]> {
    this.ticketsLoadedState.set(false);

    return this.fetchTickets();
  }

  clear(): void {
    this.ticketsState.set(new Map());
    this.ticketsLoadedState.set(false);
  }

  // ============================================================
  // PRIVATE STATE OPERATIONS
  // ============================================================

  private fetchTickets(): Observable<TicketResponse[]> {
    return this.ticketService.getTickets().pipe(
      tap((tickets) => {
        this.setTickets(tickets);
        this.ticketsLoadedState.set(true);
      }),
    );
  }

  private setTickets(tickets: TicketResponse[]): void {
    const ticketsMap = new Map<string, TicketResponse>();

    for (const ticket of tickets) {
      ticketsMap.set(ticket.id, ticket);
    }

    this.ticketsState.set(ticketsMap);
  }

  private setTicket(ticket: TicketResponse): void {
    this.ticketsState.update((current) => {
      const next = new Map(current);

      next.set(ticket.id, ticket);

      return next;
    });
  }

  private removeTicket(id: string): void {
    this.ticketsState.update((current) => {
      const next = new Map(current);

      next.delete(id);

      return next;
    });
  }
}
