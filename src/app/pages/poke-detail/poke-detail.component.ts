import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

import { PokeApiService } from 'src/app/service/poke-api.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss'],
})
export class PokeDetailComponent implements OnInit {
  private readonly baseUrlPokemonId: string = 'https://pokeapi.co/api/v2/pokemon';
  private readonly baseUrlPokemonName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public isLoaded: boolean = false;
  public apiError: boolean = false;

  constructor(
    private service: PokeApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    const id = this.route.snapshot.params['id'];

    const pokemon = this.service.getPokemonByUrl(
      `${this.baseUrlPokemonId}/${id}`
    );

    const name = this.service.getPokemonByUrl(
      `${this.baseUrlPokemonName}/${id}`
    );

    return forkJoin([pokemon, name]).subscribe({
      next: (response) => {
        this.pokemon = response;
        console.log("poke:" , response)
        this.isLoaded = true;
      },
      error: (error) => {
        this.apiError = true;
        console.log(error);
      },
    });
  }


  public getPrincipalType(list: any[]) {
    return Utils.getPrincipalType(list);
  }

}
