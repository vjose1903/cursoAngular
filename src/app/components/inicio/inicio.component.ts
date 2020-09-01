import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [],
})
export class InicioComponent implements OnInit {
  mostrarYo = true;
  constructor(private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.tooltip();
  }

  yoMostrar() {
    this.mostrarYo = !this.mostrarYo;
  }

  tecnologias() {
    $('#modalTecnologias').modal();
  }

  sobreMi() {
    $('#sobreMi').modal();
  }

  mostrarNoticia() {
    this.tooltip(true);

    setTimeout(() => {
      this.router.navigateByUrl('noticiaCompleta');
    }, 150);
  }

  tooltip(cerrar = false) {
    if (cerrar) {
      $('[data-toggle="tooltip"]').tooltip('hide');
    } else {
      $(() => {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  }
}
