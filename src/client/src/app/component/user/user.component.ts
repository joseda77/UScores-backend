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
  usuario: String;
  password: String;
  email: String;
  torneosCreados: String[];
  torneosFavoritos: String[];

  constructor(private userService: UsuariosService) {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
   }

  ngOnInit() {
  }

    /* llama al servicio de usuario para poder crear un usuario en la BD */
    addUsuario(event){
      event.preventDefault();
      const nuevoUsuario: User = {
        nombreUsuario: this.usuario,
        password: this.password,
        email: this.email,
        torneosCreados: null,// Recordad enviarle el arreglo -------------------
        torneosFavoritos: null,// Recordad enviarle el arreglo -----------------------
        isDone: false
      };
      this.userService.createUser(nuevoUsuario).subscribe( users => {this.user.push(users)} );
      this.usuario ='';
      this.password ='';
      this.email= '';
      this.torneosCreados = null;// Agregarle los torneos que el usuario elija
      this.torneosFavoritos = null;
    }

    deleteUser(usuarioABorrar){
      const msgConfirma =confirm("¿Quiere eliminar la cuenta permanentemente?");      
      if(msgConfirma == true){
        const userToDelete = this.user;
        this.userService.deleteUser(usuarioABorrar).subscribe(data => {
        if(data.n = 1){
          for(let i = 0; i < userToDelete.length; i++){
            if(userToDelete[i].nombreUsuario == usuarioABorrar){
              userToDelete.splice(i,1);
            }
          }
        }
      });
      }else{
        return;
      }     
    }

    updateUser(usuar: User){
      console.log("LLama a rest", usuar.password);
      const newUser = {
        nombreUsuario: usuar.nombreUsuario,
        password: usuar.password,
        email: usuar.email,
        torneosCreados: null, //Recordar enviarle el arreglo del torneo
        torneosFavoritos: null
      }      
      this.userService.updateUser(newUser).subscribe(res => {
        //Actualizar la pantalla con los datos obtenidos
        console.log(newUser, " Datos actualizados");
      });
    }
}
