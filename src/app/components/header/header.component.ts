import { Router } from '@angular/router';
import { GamesService } from './../../services/games.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  search: string = ''
  button: boolean = false;

  constructor(
    private game: GamesService,
    private router: Router
  ){}

  ngOnInit(){
    this.buttonStatus();
  }

  sendSearch(){
    this.game.sendSearch(this.search)
  }

  buttonStatus(){
    this.game.myButton$.subscribe(
      res =>{
        this.button = res;
      }
    )
  }

  backButton(){
    this.button = false;
    this.sendSearch();
    this.router.navigate(['/'])
  }
}
