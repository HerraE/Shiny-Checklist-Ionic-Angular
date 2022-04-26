import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonFilter',
  pure: false,
})
export class PokemonFilter implements PipeTransform {
  transform(pokemon: any[], args?: any): any {
    if (!args) {
      return pokemon;
    }
    let filtered: any[] = pokemon;
    if (args.text && args.text.length) {
      if (args.text.match(/[0-9]/)) {
        filtered = pokemon.filter((poke: any) => poke.id == args.text);
      } else {
        filtered = pokemon.filter(
          (poke: any) =>
            poke.name.toLowerCase().indexOf(args.text.toLowerCase()) > -1
        );
      }
    }
    if (!args.checked && !args.unchecked) {
      return [];
    }
    if (args.checked && args.unchecked) {
      return filtered;
    }
    if (args.checked && !args.unchecked) {
      filtered = filtered.filter((poke: any) => poke.checked === true);
    } else {
      filtered = filtered.filter((poke: any) => poke.checked === false);
    }
    console.log(filtered);
    return filtered;
  }
}
