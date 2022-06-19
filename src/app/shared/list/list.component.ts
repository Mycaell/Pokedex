import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public pokemons: any;
  private pokemonsFlag: any;

  public gifMode: boolean = false;

  private offset: number = 0;
  public isLastPage = false;

  public isLoaded: boolean = false;
  public apiError: boolean = false;

  color: ThemePalette = 'accent';
  disabled = false;

  constructor(private service: PokeApiService) {}

  ngOnInit(): void {
    this.getPokemons(this.offset);
  }

  public getPokemons(offset: number) {
    this.service.getPokemons(offset).subscribe({
      next: (response) => {
        this.pokemons = response.results;
        // console.log(response.results);
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
