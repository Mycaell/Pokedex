import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

// currect path

// import styles from 'src/app.module.scss';

// import './style.scss';

// import { wrapper } from 'src/config-scss/export.module';
// import { variables } from 'src/config-scss/variables.scss';
// src\config-scss\export.module.scss

// import { app } from './src/app.module';

// import { as } from 'app.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public pokemons: any;
  private pokemonsFlag: any;

  public apiError: boolean = false;

  private offset: number = 0;

  constructor(private service: PokeApiService) {}

  ngOnInit(): void {
    this.getPokemons(this.offset);
  }

  public getPokemons(offset: number) {
    this.service.getPokemons(offset).subscribe({
      next: (response) => {
        this.pokemons = response.results;
        console.log(response.results);
        this.pokemonsFlag = this.pokemons;
      },
      error: (error) => {
        this.apiError = true;
        console.log(error);
      },
    });
  }

  public search(value: string) {
    const filteredPokemons = this.pokemonsFlag.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.pokemons = filteredPokemons;
  }

  getPrincipalType(list: any[]) {
    const color = list.filter((x) => x.slot === 1)[0]?.type.name;

    return color;
  }

  onScroll(event: Event): void {
    console.log('scrolando');
    console.log(event);
  }
}
