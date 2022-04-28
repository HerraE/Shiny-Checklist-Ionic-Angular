import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';

@Pipe({
  name: 'pokemonFilter',
  pure: false,
})
export class PokemonFilter implements PipeTransform {
  transform(pokemon: Pokemon[], args?: any): any {
    if (!args) {
      return pokemon;
    }
    let filtered: Pokemon[] = pokemon;
    filtered = filtered.filter((poke: Pokemon) =>
      poke.types.find((type: string) => args.types[type])
    );
    if (args.text && args.text.length) {
      if (args.text.match(/[0-9]/)) {
        filtered = filtered.filter((poke: Pokemon) => poke.id == args.text);
      } else {
        filtered = filtered.filter(
          (poke: Pokemon) =>
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
      filtered = filtered.filter((poke: Pokemon) => poke.checked !== undefined);
    } else {
      filtered = filtered.filter((poke: Pokemon) => poke.checked === undefined);
    }
    return filtered;
  }
}
