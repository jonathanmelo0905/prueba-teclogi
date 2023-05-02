import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Games } from 'src/app/models/games.models';
import { CheapestPriceEver, Deal, Info, Lookup } from 'src/app/models/lookup.models';
import { Stores } from 'src/app/models/stores.models';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {

  game$ = this.game.myGame$;
  details: Lookup = <Lookup>{};
  stores: Array<Stores> = [];
  info: Array<Info> = [];
  deals: Array<Deal> = [];
  cheapestPriceEver: Array<CheapestPriceEver> = [];
  fecha!: Date;

  constructor(
    private game: GamesService,
    private router: Router
  ){}

  ngOnInit(){
    this.detailsGame();
    this.getStores();
  }

  detailsGame(){
    this.game$.subscribe(
      async res=>{
        if(res.length !=0){
          this.details = await this.getDetails(res);
          this.cheapestPriceEver = [this.details.cheapestPriceEver];
          this.fecha = new Date(this.cheapestPriceEver[0].date)
          this.deals = this.details.deals;          
          this.info = [this.details.info];
        }else{
          this.router.navigate(['/','games'])
        }
      }
    )
  }

  getStores(){
    this.game.getStore().subscribe(
      res=>{
        this.stores = res;
      }
    )
  }

  getDetails(game: Games[]){
    return new Promise<Lookup>(resolve =>{
      this.game.getLookup(game[0].gameID).subscribe(
        res =>{
          resolve(res)
        }
      );
    })
  }

  nameStore(id: string){
    let name: Array<Stores> = this.stores.filter(
      (n: Stores)=>{
        return n.storeID === id;
      }
    )
    return name[0].storeName
  }

  urlImage(id: string){
    let name: Array<Stores> = this.stores.filter(
      (n: Stores)=>{
        return n.storeID === id;
      }
    )
    return 'https://www.cheapshark.com'+name[0].images.logo
  }
}
