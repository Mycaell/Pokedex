import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { delay, map, tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  public getPokemons(offset: number, limit: number = 20): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .pipe(
        // first(),
        // delay(500000),
        tap((res) => res),
        tap((res) => {
          res.results.map((resPokemons: any) => {
            this.getPokemonByUrl(resPokemons.url).subscribe((res) => {
              resPokemons.status = res;
            });
          });
        })
      );
  }

  public getPokemonByUrl(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((res) => res));
  }
}
