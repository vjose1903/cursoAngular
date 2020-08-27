import { Component, OnInit } from "@angular/core";
import { ModalService } from 'src/app/services/modal.service';
import Swal from "sweetalert2";
declare let $: any;


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: [],
})
export class NavbarComponent implements OnInit {
  ojo = true;
  login1: boolean;
  input1: boolean;
  clave = "";
  constructor(public modalService: ModalService ) {
    this.modalService.ojo2=true
  }

  ngOnInit() {
    this.tooltip();
  }

  cerrarNav() {
    $(".navbar-collapse").collapse("hide");
    this.login1=false
    this.input1=false
  }

  alerta() {
    $("#alerta").modal();
    this.cerrarNav();
  }

  entrar() {
    this.login1 = false;
    this.input1 = true;
    $(document).ready(() => {
      $("#focusClave").trigger("focus");
    });
    this.tooltip(true);
  }

  logOut(){
    this.modalService.logOut()
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      // timerProgressBar: true,
      // onOpen: (toast) => {
      //   toast.addEventListener("mouseenter", Swal.stopTimer);
      //   toast.addEventListener("mouseleave", Swal.resumeTimer);
      // },
    });

    Toast.fire({
      // icon: "success",
      title: "Federica offline!!!",
      background: "rgb(233,233,0)",
      icon: "success",
    });
  }

  onClick1() {
    this.ojo = false;
    this.login1 = false;
  }
  onClick2() {
    this.ojo = true;
    this.login1 = true;
    this.modalService.ojo2=false
  }

  tooltip(cerrar = false) {
    if (cerrar) {
      $('[data-toggle="tooltip"]').tooltip("hide");
    } else {
      $(() => {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  }

  inputLogin() {
    if (this.clave === "123") {
      $("#loginModal").modal();

      $(document).ready(() => {
        $("#loginModal").on("shown.bs.modal", () => {
          $("#focusLogin").trigger("focus");

        });

      });
    }

    this.login1 = false;
    this.input1 = false;
    this.clave = "";
    this.cerrarNav();
  }
}
