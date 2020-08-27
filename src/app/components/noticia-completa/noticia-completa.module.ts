import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiaCompletaRoutingModule } from './noticia-completa-routing.module';
import { NoticiaCompletaComponent } from './noticia-completa.component';

@NgModule({
  declarations: [NoticiaCompletaComponent],
  imports: [
    CommonModule,
    NoticiaCompletaRoutingModule
    
  ]
})
export class NoticiaCompletaModule { }
