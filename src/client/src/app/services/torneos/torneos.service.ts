import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../../class/Tournament';
import 'rxjs/add/operator/map';

@Injectable()
export class TorneosService {
  domain: String = 'http://localhost:3200';
  constructor(private http: HttpClient) {
  }

  /* Metodo que obtiene los torneos que le proporciona node */
  getTournament() {
    return this.http
      .get<Tournament[]>(`${this.domain}/torneos`)
      .map(res => res);
  }

  /* Metodo que le envia datos para la creación de torneos a node */
  createTournament(newTournament: Tournament) {
    return this.http.post<Tournament>(`${this.domain}/torneos`, newTournament)
    .map(res => res);
  }

  deleteTournament(codigoTournament) {
    return this.http.delete<Tournament>(`${this.domain}/torneos/${codigoTournament}`)
    .map(res => res);
  }

  updateTournament(codigoTournament) {
    return this.http.put<Tournament>(`${this.domain}/torneos/${codigoTournament}`, codigoTournament)
    .map(res => res);
  }
}
