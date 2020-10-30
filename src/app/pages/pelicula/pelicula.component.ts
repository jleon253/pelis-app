import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import {Location} from '@angular/common';
import { Cast } from '../../interfaces/credits-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: MovieResponse;
  cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliService: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    this.peliService.getPeliculaDetalle(id)
      .toPromise()
      .then(movie => {
        if (!movie) {
          this.router.navigateByUrl('/home');
          return;
        }
        console.log(movie);
        this.pelicula = movie;
      })
      .catch(err => console.error(err));
    
    this.peliService.getCast(id)
      .toPromise()
      .then(cast => {
        console.log(cast);
        this.cast = cast;
      })
      .catch(err => console.error(err));
  }

  onRegresar() {
    this.location.back();
  }

}
