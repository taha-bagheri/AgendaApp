import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentacionComponent } from './documentacion/documentacion.component'; // Agrega esta línea

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    ActividadesComponent,
    MenuComponent,
    DocumentacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // Agrega AppRoutingModule aquí
    RouterModule // Agrega RouterModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
