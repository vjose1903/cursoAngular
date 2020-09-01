import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticia-completa',
  templateUrl: './noticia-completa.component.html',
  styles: [],
})
export class NoticiaCompletaComponent implements OnInit {
  constructor(public noticiaService: NoticiaService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    // this.noticiaService.
  }
  atras() {
    window.history.back();
  }
}
