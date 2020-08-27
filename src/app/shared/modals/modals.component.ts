import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/services/modal.service";

import Swal from "sweetalert2";
declare let $: any;
@Component({
  selector: "app-modals",
  templateUrl: "./modals.component.html",
  styles: [],
})
export class ModalsComponent implements OnInit {
  mensaje = { email: "", mensaje: "" };

  usuarioLogin = { nombre: "Federica", password: "123" };
  constructor(public modalService: ModalService) {
    this.modalService.privacidadSeleccionada = true;
  }

  ngOnInit(): void {}

  politicaPrivacidad() {
    this.modalService.politicaPrivacidad();
  }

  cambioPrivacidad() {
    this.modalService.cambioPrivacidad();
  }

  contacto() {
    this.modalService.contacto();
  }
  contactoFede(arg) {
    if (arg.invalid) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
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
        title: "Todos los campos son obligatorios!!!",
        background: "rgb(233,233,0)",
        icon: "error",
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
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
        title: "Mensaje enviado correctamente!!!",
        background: "rgb(233,233,0)",
        icon: "success",
      });

      this.limpiarMensaje();
      $("#contacto").modal("hide");
    }
  }

  limpiarMensaje() {
    this.mensaje.email = "";
    this.mensaje.mensaje = "";
  }

  limpiarUsuario() {
    this.usuarioLogin.nombre = "";
    this.usuarioLogin.password = "";
  }

  login(arg) {
    if (
      this.usuarioLogin.nombre === "Federica" &&
      this.usuarioLogin.password === "123"
    ) {
      setTimeout(() => {
        $(".navbar-collapse").collapse("hide");
      }, 500);

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
        title: "Federica online!!!",
        background: "rgb(233,233,0)",
        icon: "success",
      });
      this.limpiarUsuario();
      this.salirLogin();
      $(".navbar-collapse").collapse("hide");
      this.modalService.online=true
    } else {
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
        title: "Invalid data!!!",
        background: "rgb(233,233,0)",
        icon: "error",
      });
      $(document).ready(() => {
        $("#focusLogin").trigger("focus");
      });
      this.limpiarUsuario();
      $(".navbar-collapse").collapse("hide");
    }
  }

  salirLogin() {
    this.limpiarUsuario()
    $("#loginModal").modal("hide");
  }
}
