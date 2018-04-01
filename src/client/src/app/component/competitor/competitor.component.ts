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
  identificacion: String;
  nombreParticipante: String;

  constructor(private competitorService: ParticipantesService) {
    this.competitorService.getCompetitor().subscribe(competitor => 
    this.competitor = competitor);
   }

  ngOnInit() {
  }

  /* Le lleva los datos al servicio para crear un participante */
  createCompetitor(event){
    event.preventDefault();
    const nuevoParticipante: Competitor= {
      identificacion: this.identificacion,
      nombreParticipante: this.nombreParticipante,
      isDone: false
    }
    this.competitorService.createCompetitor(nuevoParticipante)
    .subscribe(participates => {this.competitor.push(participates)});
    this.identificacion ='';
    this.nombreParticipante= '';
  }

  deleteCompetitor(identi){
    const msgConfirmacion = confirm("Esta seguro de eliminar el participante");
    if( msgConfirmacion == true){
      const arrayCompetitor = this.competitor;
      this.competitorService.deleteCompetitor(identi).subscribe(data => {
        if(data.n = 1 ){
          for (let i = 0; i < arrayCompetitor.length; i++) {
            if(arrayCompetitor[i].identificacion == identi){
              arrayCompetitor.splice(i,1);
            }            
          }
        }
      });
    }else{
      return;
    }
  }

}
