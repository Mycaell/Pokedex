import { Component, OnInit, HostListener } from '@angular/core';

import { PokeApiService } from 'src/app/service/poke-api.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  public pokemons: any = [];
  private pokemonsFlag: any;

  public gifMode!: boolean;

  private offset: number = 0;

  private isFirstPage = true;
  public isLastPage = false;

  public isLoaded: boolean = false;
  public apiError: boolean = false;

  private readonly storageKeyGifMode = 'gif';

  private _showButtonScrollTop = false;

  constructor(
    private service: PokeApiService,
    private localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPokemons(this.offset);
    this.gifMode = this.isGifMode();
  }

  public getPokemons(offset: number) {
    if (this.isLastPage) return

    this.service.getPokemons(offset).subscribe({
      next: (response) => {
        if (response.results.length === 0) {
          this.isLastPage = true;
          this.openSnackBar('Não há mais registros para mostrar');
        } else {
          if (this.isFirstPage) {
            this.pokemons = response.results;
            this.isFirstPage = false;
          } else {
            this.pokemons.push(...response.results);
          }
          this.pokemonsFlag = this.pokemons;
          this.isLoaded = true;
        }
      },
      error: (error) => {
        this.apiError = true;
        console.log(error);
        this.isLoaded = false;
      },
    });
  }

  public search(value: string) {
    // OBS: o filtro toma como base apenas os pokemons já carregados, o ideal é realizar a busca considerando todos os pokemons existentes;
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

  onScrollDown() {
    this._showButtonScrollTop = true;
    this.offset += 20;
    this.getPokemons(this.offset);
  }

  onScrollUp() {
    this._showButtonScrollTop = false;
  }

  get showButtonScrollTop(): boolean {
    return this._showButtonScrollTop;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok');
  }
}
