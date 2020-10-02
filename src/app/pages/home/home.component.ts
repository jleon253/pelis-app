import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];

  constructor( private peliService: PeliculasService) {
    this.peliService.getCartelera().toPromise()
      .then(response => {
        // console.log(response);
        this.movies = response.results;
      })
      .catch(error => console.log('Error llamando a getCartelera:', error));
  }

  ngOnInit(): void {
  }

}
