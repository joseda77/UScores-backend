import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

/* Componentes */
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { TournamentComponent } from './component/tournament/tournament.component';
import { CompetitorComponent } from './component/competitor/competitor.component';

/* Servicios */
import { UsuariosService } from './services/usuarios/usuarios.service';
import { TorneosService } from './services/torneos/torneos.service';
import { ParticipantesService } from './services/participantes/participantes.service';


const appRoutes: Routes = [
  { path: '' , redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UserComponent },
  { path: 'torneos', component: TournamentComponent },
  { path: 'participantes', component: CompetitorComponent},
  /**{ path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TournamentComponent,
    CompetitorComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [UsuariosService, TorneosService, ParticipantesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
