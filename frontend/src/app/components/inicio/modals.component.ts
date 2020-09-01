import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/services/modal.service";
declare let $: any;
@Component({
  selector: "app-modals",
  templateUrl: "./modals.component.html",
  styles: [],
})
export class ModalsComponent implements OnInit {
  constructor(public mServ: ModalService) {}

  ngOnInit() {}

  paginar(arg) {
    this.mServ.paginar(arg);
  }

  cerrarTec() {
    this.mServ.cerrarTec();
  }

  cerrarSobreMi() {
    this.mServ.cerrarSobreMi();
  }
}
