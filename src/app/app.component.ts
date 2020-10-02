import { Component } from '@angular/core';
import { PeliculasService } from './services/peliculas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor( private peliService: PeliculasService) {
    this.peliService.getCartelera().toPromise()
      .then(response => console.log(response))
      .catch(error => console.log('Error en getCartelera:', error));
  }

}
