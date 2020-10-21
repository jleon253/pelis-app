import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  movies: Movie[] = [];
  busqueda = '';

  constructor( private activatedRoute: ActivatedRoute, private peliService: PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params.texto);
      this.busqueda = params.texto;
      this.peliService.buscarPeliculas(params.texto).toPromise()
        .then( movies => this.movies = movies)
        .catch(err => console.log(err));
    });
  }

}
