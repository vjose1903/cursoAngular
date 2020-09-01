import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NoticiaService } from '../services/noticia.service';

@Injectable({
  providedIn: 'root',
})
export class NoticiaCompletaGuard implements CanActivate {
  constructor(private noticiasService: NoticiaService) {}

  canActivate(): boolean {
    if (this.noticiasService.noticiaCompleta === true) {
      return true;
    } else {
      return false;
    }
  }
}
