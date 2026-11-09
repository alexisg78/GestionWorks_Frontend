import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map, shareReplay, tap } from 'rxjs/operators';

import { Ticket, TicketResponse } from '../interfaces/ticket-response.interface';
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

  private readonly ticketsState = signal<Map<string, Ticket>>(new Map());

  private readonly ticketsLoadedState = signal(false);

  private readonly countState = signal(0);

  private readonly pagesState = signal(0);

  // ============================================================
  // PUBLIC STATE
  // ============================================================

  readonly tickets = computed(() => Array.from(this.ticketsState().values()));

  readonly ticketsLoaded = this.ticketsLoadedState.asReadonly();

  readonly count = this.countState.asReadonly();

  readonly pages = this.pagesState.asReadonly();

  // ============================================================
  // IN-FLIGHT REQUESTS
  // ============================================================

  private ticketsRequest$?: Observable<Ticket[]>;

  private readonly ticketRequests = new Map<string, Observable<Ticket>>();

  // ============================================================
  // QUERIES
  // ============================================================

  loadTickets(): Observable<Ticket[]> {
    // Ya tenemos los tickets en memoria.
    if (this.ticketsLoadedState()) {
      return of(this.tickets());
    }

    // Ya existe una petición en curso.
    if (this.ticketsRequest$) {
      return this.ticketsRequest$;
    }

    const request$ = this.ticketService.getTicketsResponse().pipe(
      tap((response) => {
        this.setTickets(response.tickets);
        this.countState.set(response.count);
        this.pagesState.set(response.pages);
        this.ticketsLoadedState.set(true);
      }),

      map((response) => response.tickets),

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

  getTicket(id: string): Observable<Ticket> {
    // 1. Buscamos primero en el store.
    const cachedTicket = this.ticketsState().get(id);

    if (cachedTicket) {
      return of(cachedTicket);
    }

    // 2. Ya existe una petición para este ticket.
    const existingRequest = this.ticketRequests.get(id);

    if (existingRequest) {
      return existingRequest;
    }

    // 3. No tenemos el ticket -> hacemos HTTP.
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

  createTicket(data: TicketRequest): Observable<Ticket> {
    return this.ticketService.createTicket(data).pipe(
      tap((ticket) => {
        this.setTicket(ticket);
      }),
    );
  }

  updateTicket(id: string, data: TicketRequest): Observable<Ticket> {
    return this.ticketService.updateTicket(id, data).pipe(
      tap((ticket) => {
        this.setTicket(ticket);
      }),
    );
  }

  // ============================================================
  // CACHE / STORE MANAGEMENT
  // ============================================================

  refreshTickets(): Observable<Ticket[]> {
    this.ticketsLoadedState.set(false);

    return this.fetchTickets();
  }

  clear(): void {
    this.ticketsState.set(new Map());
    this.ticketsLoadedState.set(false);
    this.countState.set(0);
    this.pagesState.set(0);
    this.ticketsRequest$ = undefined;
    this.ticketRequests.clear();
  }

  // ============================================================
  // PRIVATE STATE OPERATIONS
  // ============================================================

  private fetchTickets(): Observable<Ticket[]> {
    return this.ticketService.getTicketsResponse().pipe(
      tap((response) => {
        this.setTickets(response.tickets);
        this.countState.set(response.count);
        this.pagesState.set(response.pages);
        this.ticketsLoadedState.set(true);
      }),

      map((response) => response.tickets),
    );
  }

  private setTickets(tickets: Ticket[]): void {
    const ticketsMap = new Map<string, Ticket>();

    for (const ticket of tickets) {
      ticketsMap.set(ticket.id, ticket);
    }

    this.ticketsState.set(ticketsMap);
  }

  private setTicket(ticket: Ticket): void {
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
