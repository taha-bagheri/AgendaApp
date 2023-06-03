import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgendaComponent } from './agenda/agenda.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';


const routes: Routes = [
  { path: 'agenda', component: AgendaComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'documentacion', component: DocumentacionComponent },
  { path: '', redirectTo: '/agenda', pathMatch: 'full' },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
