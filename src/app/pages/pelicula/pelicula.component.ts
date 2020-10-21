import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private peliService: PeliculasService) { }

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    this.peliService.getPeliculaDetalle(id)
      .toPromise()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

}
