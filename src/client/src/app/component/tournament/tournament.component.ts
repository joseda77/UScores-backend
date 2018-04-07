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
  /*codigoTorneo: String;
  nombreTorneo: String;*/
  datosTorneo: Tournament = {
    codigoTorneo: '',
    nombreTorneo: '',
    tipoTorneo: '',
    participantes: []
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
      tipoTorneo: this.datosTorneo.tipoTorneo,
      participantes: null, // Recordar enviarle el arreglo ------------------------------
    };

    this.tournamentService.createTournament(nuevoTorneo).subscribe(torneos => {this.tournament.push(torneos); });
    this.datosTorneo.codigoTorneo = '';
    this.datosTorneo.nombreTorneo = '';
    this.datosTorneo.tipoTorneo = '';
    this.datosTorneo.participantes = null; // Cambiarlo por el arreglo de participante que se traiga
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
      codigoTorneo: torneo.codigoTorneo,
      nombreTorneo: torneo.nombreTorneo,
      tipoTorneo: torneo.tipoTorneo,
      participantes: 'Luchito' // Cambiar  por los participantes, Arreglo----------------------------------------------------
    };

    this.tournamentService.updateTournament(newTorneo).subscribe(res =>
       console.log('Actualiza los datos')// --------------------------------------------------------------
      );
    this.datosTorneo.codigoTorneo = '';
    this.datosTorneo.nombreTorneo = '';
    this.datosTorneo.tipoTorneo = '';
    this.datosTorneo.participantes = null; // Cambiarlo por el arreglo de participante que se traiga
  }

}
