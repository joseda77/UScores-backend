import { Component, OnInit } from '@angular/core';
import { ParticipantesService } from '../../services/participantes/participantes.service';
import { Competitor } from '../../class/Competitor';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.css']
})
export class CompetitorComponent implements OnInit {
  competitor: Competitor[];
  datosCompetitor: Competitor = {
    identificacion: '',
    nombreParticipante: '',
    puntosAnotados: '',
    penalizaciones: ''
  };

  constructor(private competitorService: ParticipantesService) {
    this.competitorService.getCompetitor().subscribe(competitor =>
    this.competitor = competitor);
   }

  ngOnInit() {
  }

  /* Le lleva los datos al servicio para crear un participante */
  createCompetitor(event) {
    event.preventDefault();
    const nuevoParticipante: Competitor = {
      identificacion: this.datosCompetitor.identificacion,
      nombreParticipante: this.datosCompetitor.nombreParticipante,
      puntosAnotados: null,
      penalizaciones: null
    };
    this.competitorService.createCompetitor(nuevoParticipante)
    .subscribe(participates => {this.competitor.push(participates); });
    this.datosCompetitor.identificacion = '';
    this.datosCompetitor.nombreParticipante = '';
    this.datosCompetitor.puntosAnotados = '';
    this.datosCompetitor.penalizaciones = '';
  }

  deleteCompetitor(identi) {
    const msgConfirmacion = confirm('Esta seguro de eliminar el participante');
    if ( msgConfirmacion === true) {
      const arrayCompetitor = this.competitor;
      this.competitorService.deleteCompetitor(identi).subscribe(data => {
        if (data.n = 1 ) {
          for (let i = 0; i < arrayCompetitor.length; i++) {
            if (arrayCompetitor[i].identificacion === identi) {
              arrayCompetitor.splice(i, 1);
            }
          }
        }
      });
    } else {
      return;
    }
  }

  updateCompetitor(participante: Competitor) {
    const newParticipante = {
      identificacion: participante.identificacion,
      nombreParticipante: participante.nombreParticipante,
      puntosAnotados: participante.puntosAnotados,
      penalizaciones: participante.penalizaciones
    };
    this.competitorService.updateCompetitor(newParticipante).subscribe( res =>
      console.log('Competidor actualizado correctamente') // ----------------------------------------------
    );
    this.datosCompetitor.identificacion = '';
    this.datosCompetitor.nombreParticipante = '';
    this.datosCompetitor.puntosAnotados = '';
    this.datosCompetitor.penalizaciones = '';
  }

}
