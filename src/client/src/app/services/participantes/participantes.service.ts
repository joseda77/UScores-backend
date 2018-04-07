import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competitor } from '../../class/Competitor';
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipantesService {
  domain: String = 'http://localhost:3200';

  constructor(private http: HttpClient) { }

  /* Metodo que obtiene los participantes que le proporciona node */
  getCompetitor() {
    return this.http.get<Competitor[]>(`${this.domain}/participantes`).map(res => res);
  }

  /* Metodo que le envia la lista de los participantes a node */
  createCompetitor(newCompetitor: Competitor) {
    return this.http.post<Competitor>(`${this.domain}/participantes`, newCompetitor).map(res => res);
  }

  /* Metodo que le envia el participante a eliminar a node */
  deleteCompetitor(identificacion) {
    return this.http.delete<Competitor>(`${this.domain}/participantes/${identificacion}`)
    .map(res => res);
  }

  updateCompetitor(identificacion) {
    return this.http.put<Competitor>(`${this.domain}/participantes/${identificacion}`, identificacion)
    .map(res => res);
  }

}
