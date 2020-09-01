import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  noticiaSelected: any;

  noticiaCompleta = false;

  constructor() {}
}
