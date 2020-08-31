import { Component, OnInit } from "@angular/core";
declare let $: any;
@Component({
  selector: "app-modals",
  templateUrl: "./modals.component.html",
  styles: [],
})
export class ModalsComponent implements OnInit {
  paginaActual = 1;

  constructor() {}

  ngOnInit() {}

  paginar(arg) {
    this.paginaActual = arg;
  }

  cerrarTec() {
    $("#modalTecnologias").modal("hide");

    setTimeout(() => {
      this.paginar(1);
    }, 500);
  }
}
