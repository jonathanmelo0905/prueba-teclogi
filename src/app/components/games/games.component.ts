import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Games, Juegos } from 'src/app/models/games.models';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass'],
})
export class GamesComponent {
  url: string = 'assets/juegos.png'
  message: string = '¡Bienvenidos a nuestra página de búsqueda de videojuegos! Actualmente, no hay ningún videojuego listado en la página. Pero no te preocupes, puedes utilizar nuestra función de búsqueda para encontrar el juego que estás buscando. Para comenzar, simplemente escribe el nombre del juego en el cuadro de búsqueda y presiona el botón de buscar. '
  games: Array<Games> = [];
  search$ = this.game.mySearch$;

  constructor(
    private game: GamesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buscarjuego();
  }

  buscarjuego() {
    this.search$.subscribe((res) => {
      if(res != '')this.comsumirApi(res);
    });
  }

  async comsumirApi(data: string) {
    let name = data;
    this.game.getGames(name).subscribe((res) => {
      this.games = res;
      if(this.games.length === 0)this.noFoundGame(name);
    });
  }

  noFoundGame(name: string){
    this.message = `Lo siento, parece que no hemos encontrado ningún juego que coincida exactamente con el título ${name} que estás buscando. Pero no te desanimes, También puedes intentar realizar una búsqueda con palabras clave más generales, en lugar de utilizar el título exacto del juego.`;
    this.url = 'assets/triste.png';
  }

  seeDetails(game: Games){
    this.game.sendGame(game);
    this.game.buttonStatus(true);
    this.router.navigate(['/','details'])
  }
}
