import { Component, OnInit } from '@angular/core';
import { TorneosService } from '../../services/torneos/torneos.service';
import { Tournament } from '../../class/Tournament';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  tournament: Tournament[];
  datosTorneo: Tournament = {
    codigoTorneo: '',
    nombreTorneo: '',
    deporte: '',
    tipoTorneo: 0,
    listaEquipos: [],
    listaPartidos: []
  };

  constructor(private tournamentService: TorneosService) {
    this.tournamentService.getTournament().subscribe(tournament => {
      this.tournament = tournament;
    });
  }

  ngOnInit() {
  }
  /* Llama al servicio de torneos para poder crear un torneo en la BD */
  createTournament(event) {
    event.preventDefault();
    const nuevoTorneo: Tournament = {
      codigoTorneo: this.datosTorneo.codigoTorneo,
      nombreTorneo: this.datosTorneo.nombreTorneo,
      deporte: this.datosTorneo.deporte,
      tipoTorneo: this.datosTorneo.tipoTorneo, // Forma de convertirlo a number
      listaEquipos: [], // Recordar enviarle el arreglo ------------------------------
      listaPartidos: [] // Recordar enviarle el arreglo ------------------------------
    };

    this.tournamentService.createTournament(nuevoTorneo).subscribe(torneos => {this.tournament.push(torneos); });
    this.datosTorneo.codigoTorneo = '';
    this.datosTorneo.nombreTorneo = '';
    this.datosTorneo.deporte = '';
    this.datosTorneo.tipoTorneo = 0;
    this.datosTorneo.listaEquipos = []; // Cambiarlo por el arreglo de participante que se traiga
    this.datosTorneo.listaPartidos = []; // Cambiarlo por el arreglo de participante que se traiga
  }

  deleteTournament(codeTournament) {
    const msgConfirmacion = confirm('¿Esta seguro que desea borrar el torneo y todo su contenido?');
    if (msgConfirmacion === true) {
      const torneoToDelete = this.tournament;
      this.tournamentService.deleteTournament(codeTournament).subscribe(data => {
        if (data.n = 1) {
          for (let i = 0; i < torneoToDelete.length; i++) {
            if (torneoToDelete[i].codigoTorneo === codeTournament) {
              torneoToDelete.splice(i, 1);
            }
          }
        }
      });
    } else {
      return;
    }
  }

  updateTournament(torneo: Tournament) {
    console.log('Entra en el update', torneo); // -----------------------------------------------------------
    const newTorneo = {
      codigoTorneo: torneo.codigoTorneo, // Mirar si el codigo del torneo se puede actualizar o no
      nombreTorneo: torneo.nombreTorneo,
      deporte: torneo.deporte,
      tipoTorneo: torneo.tipoTorneo,
      listaEquipos: [], // Cambiar  por los Equipos, Arreglo----------------------------------------------------
      listaPartidos: []  // Cambiar  por los Equipos, Arreglo----------------------------------------------------
    };

    this.tournamentService.updateTournament(newTorneo).subscribe(res =>
       console.log('Actualiza los datos')// --------------------------------------------------------------
      );
    this.datosTorneo.codigoTorneo = '';
    this.datosTorneo.nombreTorneo = '';
    this.datosTorneo.deporte = '';
    this.datosTorneo.tipoTorneo = 0;
    this.datosTorneo.listaEquipos = null; // Cambiarlo por el arreglo de participante que se traiga
    this.datosTorneo.listaPartidos = null; // Cambiarlo por el arreglo de participante que se traiga
  }

}
