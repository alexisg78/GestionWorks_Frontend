import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map, shareReplay, tap } from 'rxjs/operators';

import { Ticket, TicketResponse } from '../interfaces/ticket-response.interface';
import { TicketRequest } from '../interfaces/ticket-request.interface';
import { TicketService } from './ticket.service';

const DEFAULT_PAGE_SIZE = 10;

@Injectable({
  providedIn: 'root',
})
export class TicketStore {
  private readonly ticketService = inject(TicketService);

  // Estado de las incidencias
  private readonly ticketsState = signal<Map<string, Ticket>>(new Map());

  private readonly currentPageState = signal(1);
  private readonly currentPageIdsState = signal<string[]>([]);

  private readonly countState = signal(0);
  private readonly pagesState = signal(0);

  // Páginas que ya fueron cargadas
  private readonly loadedPagesState = signal<Set<number>>(new Set());

  // Estado público
  readonly tickets = computed(() => {
    const ticketsMap = this.ticketsState();

    return this.currentPageIdsState()
      .map((id) => ticketsMap.get(id))
      .filter((ticket): ticket is Ticket => ticket !== undefined);
  });

  readonly currentPage = this.currentPageState.asReadonly();
  readonly count = this.countState.asReadonly();
  readonly pages = this.pagesState.asReadonly();

  readonly ticketsLoaded = computed(() => this.loadedPagesState().has(this.currentPageState()));

  // Caché de respuestas paginadas
  private readonly pagesCache = new Map<number, TicketResponse>();

  // Solicitudes de páginas en curso
  private readonly pageRequests = new Map<number, Observable<TicketResponse>>();

  // Solicitudes individuales en curso
  private readonly ticketRequests = new Map<string, Observable<Ticket>>();

  /**
   * Carga una página de incidencias.
   */
  loadTickets(page: number, limit = DEFAULT_PAGE_SIZE): Observable<Ticket[]> {
    const safePage = Math.max(1, Math.floor(page));

    this.currentPageState.set(safePage);

    // Si la página está en caché, no realiza otra petición.
    const cachedResponse = this.pagesCache.get(safePage);

    if (cachedResponse) {
      this.applyPageResponse(cachedResponse, safePage);
      return of(cachedResponse.tickets);
    }

    // Si ya existe una petición para esa página, la reutiliza.
    const existingRequest = this.pageRequests.get(safePage);

    if (existingRequest) {
      return existingRequest.pipe(
        tap((response) => this.applyPageResponse(response, safePage)),
        map((response) => response.tickets),
      );
    }

    // El backend utiliza limit y offset.
    const offset = (safePage - 1) * limit;

    const request$ = this.ticketService.getTicketsResponse(limit, offset).pipe(
      tap((response) => {
        this.pagesCache.set(safePage, response);

        this.loadedPagesState.update((current) => {
          const next = new Set(current);
          next.add(safePage);
          return next;
        });

        this.applyPageResponse(response, safePage);
      }),
      finalize(() => {
        this.pageRequests.delete(safePage);
      }),
      shareReplay({
        bufferSize: 1,
        refCount: false,
      }),
    );

    this.pageRequests.set(safePage, request$);

    return request$.pipe(map((response) => response.tickets));
  }

  /**
   * Obtiene una incidencia por ID.
   * Primero consulta la caché y luego realiza la petición HTTP.
   */
  getTicket(id: string): Observable<Ticket> {
    const cachedTicket = this.ticketsState().get(id);

    if (cachedTicket) {
      return of(cachedTicket);
    }

    const existingRequest = this.ticketRequests.get(id);

    if (existingRequest) {
      return existingRequest;
    }

    const request$ = this.ticketService.getTicket(id).pipe(
      tap((ticket) => this.setTicket(ticket)),
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

  /**
   * Crea una incidencia.
   */
  createTicket(data: TicketRequest): Observable<Ticket> {
    return this.ticketService.createTicket(data).pipe(
      tap((ticket) => {
        this.setTicket(ticket);
        this.invalidatePages();
      }),
    );
  }

  /**
   * Actualiza una incidencia.
   */
  updateTicket(id: string, data: TicketRequest): Observable<Ticket> {
    return this.ticketService.updateTicket(id, data).pipe(
      tap((ticket) => {
        this.setTicket(ticket);
        this.invalidatePages();
      }),
    );
  }

  /**
   * Fuerza la recarga de una página.
   */
  refreshTickets(page = this.currentPageState(), limit = DEFAULT_PAGE_SIZE): Observable<Ticket[]> {
    const safePage = Math.max(1, Math.floor(page));

    this.pagesCache.delete(safePage);

    this.loadedPagesState.update((current) => {
      const next = new Set(current);
      next.delete(safePage);
      return next;
    });

    return this.loadTickets(safePage, limit);
  }

  /**
   * Limpia todo el estado del store.
   */
  clear(): void {
    this.ticketsState.set(new Map());
    this.currentPageState.set(1);
    this.currentPageIdsState.set([]);
    this.countState.set(0);
    this.pagesState.set(0);

    this.pagesCache.clear();
    this.loadedPagesState.set(new Set());

    this.pageRequests.clear();
    this.ticketRequests.clear();
  }

  /**
   * Aplica una respuesta paginada al estado actual.
   */
  private applyPageResponse(response: TicketResponse, page: number): void {
    // Evita que una respuesta antigua reemplace la página seleccionada.
    if (this.currentPageState() !== page) {
      return;
    }

    this.setTickets(response.tickets);

    this.currentPageIdsState.set(response.tickets.map((ticket) => ticket.id));

    this.countState.set(response.count);
    this.pagesState.set(response.pages);
  }

  /**
   * Agrega o actualiza varias incidencias en la caché.
   */
  private setTickets(tickets: Ticket[]): void {
    this.ticketsState.update((current) => {
      const next = new Map(current);

      for (const ticket of tickets) {
        next.set(ticket.id, ticket);
      }

      return next;
    });
  }

  /**
   * Agrega o actualiza una incidencia en la caché.
   */
  private setTicket(ticket: Ticket): void {
    this.ticketsState.update((current) => {
      const next = new Map(current);
      next.set(ticket.id, ticket);
      return next;
    });
  }

  /**
   * Invalida las páginas almacenadas.
   */
  private invalidatePages(): void {
    this.pagesCache.clear();
    this.loadedPagesState.set(new Set());

    this.currentPageIdsState.set([]);
    this.countState.set(0);
    this.pagesState.set(0);
  }
}
