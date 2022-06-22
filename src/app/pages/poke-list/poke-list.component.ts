import { Component, OnInit } from '@angular/core';

import { PokeApiService } from 'src/app/service/poke-api.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  public pokemons: any;
  private pokemonsFlag: any;

  public gifMode!: boolean;

  private offset: number = 0;
  public isLastPage = false;

  public isLoaded: boolean = false;
  public apiError: boolean = false;

  private readonly storageKeyGifMode = 'gif';

  constructor(
    private service: PokeApiService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getPokemons(this.offset);
    this.gifMode = this.isGifMode();
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

  public getPrincipalType(list: any[]) {
    const color = list.filter((x) => x.slot === 1)[0]?.type.name;

    return color;
  }

  public isGifMode(): boolean {
    const gif: string =
      (this.localStorageService.getItem(this.storageKeyGifMode) as 'true') ||
      'false';

    const active: boolean = gif === 'true' ? true : false;

    this.gifMode = active;

    return active;
  }

  public switchGifMode(): void {
    this.gifMode = !this.gifMode;
    this.localStorageService.setItem(
      this.storageKeyGifMode,
      this.gifMode.toString()
    );
  }

  onScroll(event: Event): void {
    console.log('scrolando');
    console.log(event);
  }
}
