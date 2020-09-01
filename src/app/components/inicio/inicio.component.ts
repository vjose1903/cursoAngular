import { Component, OnInit } from "@angular/core";
declare let $: any;
@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styles: [],
})
export class InicioComponent implements OnInit {
  mostrarYo = true;
  constructor() {}

  ngOnInit() {}

  yoMostrar() {
    this.mostrarYo = !this.mostrarYo;
  }

  tecnologias() {
    $("#modalTecnologias").modal();
  }

  sobreMi() {
    $("#sobreMi").modal();
  }
}
