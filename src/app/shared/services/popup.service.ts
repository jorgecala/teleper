import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  errorHttp() {
    Swal.fire({
      icon: 'error',
      text: 'Por fallas técnicas no fue posible atender tu solicitud. Por favor intenta más tarde.',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'swalConfirmButton'
      },
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    return;
  }

  successService(title: string, msg: string, txtBtn: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: msg,
      confirmButtonText: txtBtn,
      customClass: {
        confirmButton: 'swalConfirmButton'
      },
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    return;
  }

  noResponseService (msg: string, txtBtn: string) {
    Swal.fire({
      icon: 'warning',
      text: msg,
      confirmButtonText: txtBtn,
      customClass: {
        confirmButton: 'swalConfirmButton'
      },
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    return;
  }

  completeFields() {
    Swal.fire({
      icon: 'info',
      text: 'Completa todos los campos',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'swalConfirmButton'
      },
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    return;
  }
}