import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private pokemonLists: any[] = [
    { name: '1. Kanto', from: 1, to: 151, active: false },
    { name: '2. Johto', from: 152, to: 251, active: false },
    { name: '3. Hoenn', from: 252, to: 386, active: false },
    { name: '4. Sinnoh', from: 387, to: 493, active: false },
    { name: '5. Einall', from: 494, to: 649, active: false },
    { name: '6. Kalos', from: 650, to: 721, active: false },
    { name: '7. Alola', from: 722, to: 809, active: false },
    { name: '8. Galar', from: 810, to: 898, active: false },
    {
      name: 'Mega-Entwicklung',
      ids: [
        10033, 10034, 10035, 10036, 10037, 10038, 10039, 10040, 10041, 10042,
        10043, 10044, 10045, 10046, 10047, 10048, 10049, 10050, 10051, 10052,
        10053, 10054, 10055, 10056, 10057, 10058, 10059, 10060, 10062, 10063,
        10064, 10065, 10066, 10067, 10068, 10069, 10070, 10071, 10072, 10073,
        10074, 10075, 10076, 10077, 10078, 10079, 10087, 10088, 10089, 10090,
      ],
    },
    {
      name: 'Alola-Form',
      ids: [
        10091, 10092, 10100, 10101, 10102, 10103, 10104, 10105, 10106, 10107,
        10108, 10109, 10110, 10111, 10112, 10113, 10114, 10115,
      ],
    },
    {
      name: 'Galar-Form',
      ids: [
        10161, 10162, 10163, 10164, 10165, 10166, 10167, 10168, 10169, 10170,
        10171, 10172, 10173, 10174, 10175, 10176, 10177, 10178, 10179, 10180,
      ],
    },
    {
      name: 'Legendär',
      ids: [
        144, 145, 146, 150, 243, 244, 245, 249, 250, 378, 379, 380, 381, 382,
        383, 384, 480, 481, 482, 483, 484, 485, 486, 487, 488, 638, 639, 640,
        641, 642, 643, 644, 645, 646, 716, 717, 718, 772, 773, 785, 786, 787,
        788, 789, 790, 791, 792, 793, 800, 888, 889, 891, 892, 894, 895, 896,
        897, 898,
      ],
    },
    {
      name: 'Mysteriös',
      ids: [
        151, 251, 385, 386, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719,
        720, 721, 801, 802, 807, 808, 809, 893,
      ],
    },
    {
      name: 'Ultrabestien',
      ids: [793, 794, 795, 796, 797, 798, 799, 803, 804, 805, 806],
    },
  ];
  private selectedPokemonList: any = this.pokemonLists.find(
    (list: any) => list.name === 'Mysteriös'
  );
  private filter: any = {
    text: '',
    checked: true,
    unchecked: true,
  };
  private checkedPokemon: number[];
  private pokemonList: any[];

  constructor(
    private httpClient: HttpClient,
    private loadingController: LoadingController
  ) {
    this.getCheckedFromLocalStorage();
    this.loadPokemonList();
  }

  private getCheckedFromLocalStorage(): void {
    let checked = localStorage.getItem('checked');
    if (!checked) {
      localStorage.setItem('checked', '[]');
      this.checkedPokemon = [];
      return;
    }
    this.checkedPokemon = JSON.parse(checked);
  }

  private saveCheckedToLocalStorage(): void {
    localStorage.setItem('checked', JSON.stringify(this.checkedPokemon));
  }

  private loadPokemonList(): void {
    this.pokemonList = [];
    if (!this.selectedPokemonList) {
      return;
    }
    let requests: Observable<any>[] = [];
    if (this.selectedPokemonList.ids) {
      for (let id of this.selectedPokemonList.ids) {
        requests.push(
          this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );
      }
      this.forkJoinPokemonListRequests(requests);
    } else {
      this.httpClient
        .get(
          `https://pokeapi.co/api/v2/pokemon?limit=${
            this.selectedPokemonList.to + 1 - this.selectedPokemonList.from
          }&offset=${this.selectedPokemonList.from - 1}`
        )
        .subscribe((response: any) => {
          for (let pokemon of response.results) {
            requests.push(this.httpClient.get(pokemon.url));
          }
          this.forkJoinPokemonListRequests(requests);
        });
    }
  }

  private forkJoinPokemonListRequests(requests: Observable<any>[]): void {
    if (!requests.length) {
      return;
    }
    let loading: any;
    this.loadingController
      .create({
        message: 'Bitte warten ...',
      })
      .then((data) => {
        loading = data;
        loading.present();
        // forkJoin(requests).subscribe((response: any[]) => {
        //   forkJoin(
        //     response.map((res: any) => this.httpClient.get(res.species.url))
        //   ).subscribe((speciesResponse: any[]) => {
        //     let varietiesRequests: Observable<any>[] = [];
        //     for (let speciesRes of speciesResponse) {
        //       varietiesRequests = varietiesRequests.concat(
        //         speciesRes.varieties.map((variety: any) =>
        //           this.httpClient.get(variety.pokemon.url)
        //         )
        //       );
        //     }
        //     forkJoin(varietiesRequests).subscribe(
        //       (varietiesResponse: any[]) => {
        //         console.log(varietiesResponse);
        //         this.pokemonList = varietiesResponse.map((varietyRes: any) => {
        //           console.log(varietyRes);
        //           return {
        //             id: varietyRes.id,
        //             name: speciesResponse.find(
        //               (speciesRes: any) => speciesRes.id === varietyRes.id
        //             ),
        //             checked: this.checkedPokemon.indexOf(varietyRes.id) > -1,
        //             imageUrl: varietyRes.sprites.other.home.front_shiny || varietyRes.sprites.front_shiny,
        //           };
        //         });
        //         this.pokemonList.sort((a: any, b: any) => a.id - b.id);
        //         loading.dismiss();
        //       }
        //     );
        //   });
        forkJoin(requests).subscribe((response: any[]) => {
          this.pokemonList = response.map((res: any) => {
            let pokemon = {
              id: res.id,
              name: res.name,
              checked: this.checkedPokemon.indexOf(res.id) > -1,
              imageUrl:
                res.sprites.other.home.front_shiny || res.sprites.front_shiny,
            };
            this.httpClient
              .get(res.species.url)
              .subscribe((speciesResponse: any) => {
                // let varietiesRequests: Observable<any>[] =
                //   speciesResponse.varieties.map((variety: any) =>
                //     this.httpClient.get(variety.pokemon.url)
                //   );
                // forkJoin(varietiesRequests).subscribe(
                //   (varietiesResponse: any[]) => {
                //     this.pokemonList = this.pokemonList.concat(
                //       varietiesResponse.map((varietyRes: any) => {
                //         return {
                //           id: varietyRes.id,
                //           name: varietyRes.name,
                //           checked:
                //             this.checkedPokemon.indexOf(varietyRes.id) > -1,
                //           imageUrl:
                //             varietyRes.sprites.other.home.front_shiny ||
                //             varietyRes.sprites.front_shiny,
                //         };
                //       })
                //     );
                //   }
                // );
                pokemon.name = speciesResponse.names.find(
                  (name: any) => name.language.name === 'de'
                ).name;
              });
            return pokemon;
          });
          this.pokemonList.sort((a: any, b: any) => a.id - b.id);
          loading.dismiss();
        });
      });
  }

  private checkPokemon(pokemon: any): void {
    pokemon.checked = !pokemon.checked;
    if (pokemon.checked) {
      this.checkedPokemon.push(pokemon.id);
    } else {
      this.checkedPokemon.splice(this.checkedPokemon.indexOf(pokemon.id), 1);
    }
    this.saveCheckedToLocalStorage();
  }

  private selectPokemonList(list: any): void {
    console.log(list);
    this.pokemonLists.map((r: any) => {
      r.active = false;
      return r;
    });
    list.active = true;
    this.loadPokemonList();
  }

  private showPokemonInfo(pokemon: any): void {
    pokemon.name = 'Test';
  }

  private getCheckedPokemon(): number {
    return this.pokemonList.filter((poke: any) => poke.checked).length;
  }
}
