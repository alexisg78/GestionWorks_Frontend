import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';
import { SKIP_AUTH } from '../http/http-context.tokens';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = inject(AuthService).token();

  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
}
