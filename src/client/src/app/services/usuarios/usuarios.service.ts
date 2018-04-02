import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../../class/User';

@Injectable()
export class UsuariosService {
  domain: String = 'http://localhost:3200';
  constructor(private http: HttpClient) { }

  /* Metodo que obtiene los usuarios que le proporciona node */
  getUser() {
    return this.http
      .get<User[]>(`${this.domain}/usuarios`)
      .map(res => res);
  }

  /* Metodo que le envia datos para la creación de usuarios a node */
  createUser(newUser: User) {
    return this.http.post<User>(`${this.domain}/usuarios`, newUser)
    .map(res => res);
  }

  /* Metodo que indica que usuario debe borrar a node */
  deleteUser(nombreUsuario) {
    return this.http.delete<User>(`${this.domain}/usuarios/${nombreUsuario}`)
    .map(res => res);
  }

  /* Metodo que indica que campos actualizar a node */
  updateUser(newUser) {
    console.log(newUser);
    return this.http.put<User>(`${this.domain}/usuarios/${newUser.nombreUsuario}`, newUser)
    .map(res => res);
  }
}
