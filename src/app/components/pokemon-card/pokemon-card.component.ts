import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  readonly pokemonTypes: any = {
    normal:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/640px-Pok%C3%A9mon_Normal_Type_Icon.svg.png',
    fire: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/640px-Pok%C3%A9mon_Fire_Type_Icon.svg.png',
    water:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/640px-Pok%C3%A9mon_Water_Type_Icon.svg.png',
    grass:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/640px-Pok%C3%A9mon_Grass_Type_Icon.svg.png',
    electric:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/640px-Pok%C3%A9mon_Electric_Type_Icon.svg.png',
    ice: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/640px-Pok%C3%A9mon_Ice_Type_Icon.svg.png',
    fighting:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/640px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png',
    poison:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/640px-Pok%C3%A9mon_Poison_Type_Icon.svg.png',
    ground:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/640px-Pok%C3%A9mon_Ground_Type_Icon.svg.png',
    flying:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/640px-Pok%C3%A9mon_Flying_Type_Icon.svg.png',
    psychic:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/640px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png',
    bug: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/640px-Pok%C3%A9mon_Bug_Type_Icon.svg.png',
    rock: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/640px-Pok%C3%A9mon_Rock_Type_Icon.svg.png',
    ghost:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/512px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png?20200511093908',
    dragon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/640px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png',
    dark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/640px-Pok%C3%A9mon_Dark_Type_Icon.svg.png',
    steel:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/1024px-Pok%C3%A9mon_Steel_Type_Icon.svg.png',
    fairy:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/640px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png',
  };

  @Input() private pokemon: Pokemon;
  @Output() private check = new EventEmitter<Pokemon>();
  @Output() private uncheck = new EventEmitter<Pokemon>();

  private timeoutHandler: any;
  private count: number;

  constructor() {}

  ngOnInit() {}

  private checkPokemon(): void {
    if (this.pokemon.checked !== undefined) {
      this.pokemon.checked++;
    } else {
      this.pokemon.checked = 0;
    }
    this.check.emit(this.pokemon);
  }

  private uncheckPokemon(): void {
    delete this.pokemon.checked;
    this.uncheck.emit(this.pokemon);
  }

  private mousedown(event: Event): void {
    this.count = 0;
    this.timeoutHandler = setInterval(() => {
      ++this.count;
      if (this.count > 7) {
        this.mouseup(event);
      }
    }, 100);
  }

  private mouseup(event: Event): void {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
      if (this.count > 5) {
        this.uncheckPokemon();
      } else {
        this.checkPokemon();
      }
    }
  }

  private getColor(): string {
    if (this.pokemon.checked === 0) {
      return 'primary';
    }
    if (this.pokemon.checked === 1) {
      return 'secondary';
    }
    if (this.pokemon.checked > 1) {
      return 'success';
    }
    return 'light';
  }
}
