import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl = 'https://api.themoviedb.org/3';
  carteleraPage = 1;
  cargando = false;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: '35ce4b3c4f02f07fd912b162e8bd3bfb',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {params: this.params})
      .pipe(
        map( resp => resp.results ),
        tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      }));
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = {
      ...this.params,
      page: '1',
      query: texto,
      include_adult: 'true',
    };
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {params})
      .pipe(
        map( resp => resp.results )
      );
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getPeliculaDetalle(id: string) {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {params: this.params})
      .pipe(
        catchError(err => of(null))
      );
  }

  getCast(id: string) {
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {params: this.params})
      .pipe(
        map(resp => resp.cast),
        catchError(err => of([]))
      );
  }
}
