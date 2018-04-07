import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { User } from '../../class/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User[];
  datosUser: User = {
    nombreUsuario: '',
    password: '',
    email: '',
    torneosCreados: [], // REcordar quitar el arreglo null
    torneosFavoritos: []
  };

  constructor(private userService: UsuariosService) {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}

  /* llama al servicio de usuario para poder crear un usuario en la BD */
  addUsuario(user2: User) {
    event.preventDefault();
    const nuevoUsuario: User = {
      nombreUsuario: this.datosUser.nombreUsuario,
      password: this.datosUser.password,
      email: this.datosUser.email,
      torneosCreados: null, // Recordad enviarle el arreglo -------------------
      torneosFavoritos: null // Recordad enviarle el arreglo -----------------------
    };
    this.userService.createUser(nuevoUsuario).subscribe(users => {
      this.user.push(users);
    });
    this.datosUser.nombreUsuario = '';
    this.datosUser.password = '';
    this.datosUser.email = '';
    this.datosUser.torneosCreados = null; // Agregarle los torneos que el usuario elija
    this.datosUser.torneosFavoritos = null;
  }

  deleteUser(usuarioABorrar) {
    const msgConfirma = confirm('¿Quiere eliminar la cuenta permanentemente?');
    if (msgConfirma === true) {
      const userToDelete = this.user;
      this.userService.deleteUser(usuarioABorrar).subscribe(data => {
        if ((data.n = 1)) {
          for (let i = 0; i < userToDelete.length; i++) {
            if (userToDelete[i].nombreUsuario === usuarioABorrar) {
              userToDelete.splice(i, 1);
            }
          }
        }
      });
    } else {
      return;
    }
  }

  updateUser(usuar: User) {
    const newUser = {
      nombreUsuario: usuar.nombreUsuario,
      password: usuar.password,
      email: usuar.email,
      torneosCreados: [], // Recordar enviarle el arreglo del torneo
      torneosFavoritos: [] // Recordar enviarle el arreglo del torneo
    };

    this.userService.updateUser(newUser).subscribe(res => {
      console.log('Datos actualizados'); // --------------------------------------------------
    });
    this.datosUser.nombreUsuario = '';
    this.datosUser.password = '';
    this.datosUser.email = '';
    this.datosUser.torneosCreados = null; // Agregarle los torneos que el usuario elija
    this.datosUser.torneosFavoritos = null;
  }
  // Recordar el for para actualizar los datos en el vector -------------------------------------------
}
