import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Games, Juegos } from '../models/games.models';
import { Lookup } from '../models/lookup.models';
import { Stores } from '../models/stores.models';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  private URL = environment.apiUrl
  private search: string = '';
  private game: Games = <Games>{}
  private button: boolean = false;

  private  mySearch = new BehaviorSubject<string>('');
  private myButton = new Subject<boolean>;
  private  myGame = new BehaviorSubject<Games[]>([]);
  mySearch$ = this.mySearch.asObservable();
  myGame$ = this.myGame.asObservable();
  myButton$ = this.myButton.asObservable();


  constructor( private http : HttpClient) { }

  sendSearch(search: string){
    this.search = search;
    this.mySearch.next(this.search);
  }
  sendGame(game: Games){
    this.game = game
    this.myGame.next([this.game]);
  }

  buttonStatus(state: boolean){
    this.button = state;
    this.myButton.next(this.button)
  }

  getGames(name: string){
    return this.http.get<Games[]>(`${this.URL}/games?title=${name}&steamAppID=&limit=10&exact=0`)
  }
  getLookup(id: string){
    return this.http.get<Lookup>(`${this.URL}/games?id=${id}`)
  }

  getStore(){
    return this.http.get<Stores[]>(`${this.URL}/stores`)
  }
}
