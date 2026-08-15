import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(message: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      timer: 2000,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
    });
  }

  error(message: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      timer: 2000,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
    });
  }

  warning(message: string) {
    return Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: message,
      timer: 2000,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
    });
  }

  info(message: string) {
    return Swal.fire({
      icon: 'info',
      title: 'Información',
      text: message,
      timer: 2000,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
    });
  }
}
