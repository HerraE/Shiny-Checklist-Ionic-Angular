import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';
import { PokemonFilter } from './pipes/pokemon-filter.pipe';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [AppComponent, ObjectKeysPipe, PokemonFilter, PokemonCardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
