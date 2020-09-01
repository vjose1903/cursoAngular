import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ModalService } from 'src/app/services/modal.service';

declare let $: any;
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styles: [],
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(public modalService: ModalService) {
    this.modalService.privacidad = true;
  }

  ngOnInit() {}

  whatsApp() {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: true,
      customClass: { confirmButton: "back9" },
      // timer: 3000,
      // timerProgressBar: true,
      // onOpen: (toast) => {
      //   toast.addEventListener("mouseenter", Swal.stopTimer);
      //   toast.addEventListener("mouseleave", Swal.resumeTimer);
      // },
    });

    Toast.fire({
      // icon: "success",
      title: "(809) 879-0161",
      background: "rgb(233,233,0)",
    });
  }


  salir() {
    setTimeout(() => {
      $("#privacidad").modal("hide");
    }, 300);
  }
  
  privacidad() {
    this.modalService.privacidad = true;
    $('#privacidad').modal();
  }

  irAlerta() {
    $('#privacidad').modal('hide');
    setTimeout(() => {
      $('#alerta').modal();
    }, 500);
  }
}
