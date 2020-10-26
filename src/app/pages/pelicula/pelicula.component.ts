import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: MovieResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliService: PeliculasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    this.peliService.getPeliculaDetalle(id)
      .toPromise()
      .then(movie => {
        console.log(movie);
        this.pelicula = movie;
      })
      .catch(err => console.error(err));
  }

  onRegresar() {
    this.location.back();
  }

}
