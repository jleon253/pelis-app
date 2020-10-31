import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import {Location} from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import {combineLatest} from 'rxjs';

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

    /*
    combineLatest([]):
    Similar a Promise.all() , ejecuta varios observables a la vez y
    retorna un array con las respuestas de cada observable
    */
    combineLatest([
      this.peliService.getPeliculaDetalle(id),
      this.peliService.getCast(id)
    ]).toPromise()
      .then(([movie, cast]) => {
        if (!movie) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.pelicula = movie;
        this.cast = cast;
      })
      .catch(err => console.error(err));

  }

  onRegresar() {
    this.location.back();
  }

}
