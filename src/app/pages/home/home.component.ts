import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie, CarteleraResponse } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSlideshow: Movie[] = [];

  constructor( private peliService: PeliculasService) {
    this.peliService.getCartelera().toPromise()
      .then(movies => {
        // console.log(response);
        this.movies = movies;
        this.moviesSlideshow = movies;
      })
      .catch(error => console.log('Error llamando a getCartelera:', error));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.peliService.resetCarteleraPage();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if (pos > max) {
      // console.log('llamar servicio');
      this.peliService.getCartelera()
        .toPromise()
        .then(movies => {
          this.movies.push(...movies);
        })
        .catch(err => console.log(err));
    }
  }

}
