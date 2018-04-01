import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
 
/* Componentes */
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { TournamentComponent } from './component/tournament/tournament.component';
import { CompetitorComponent } from './component/competitor/competitor.component';

/* Servicios */
import { UsuariosService } from './services/usuarios/usuarios.service';
import { TorneosService } from './services/torneos/torneos.service';
import { ParticipantesService } from './services/participantes/participantes.service'; 



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
    FormsModule
  ],
  providers: [
    UsuariosService,
    TorneosService,
    ParticipantesService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
