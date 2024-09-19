import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  onSubmit() {
    // Aqui você implementará a lógica de login
    console.log('Login submetido', this.email, this.senha);
  }

  onEsqueciSenha() {
    // Aqui você implementará a lógica de "esqueci minha senha"
    console.log('Esqueci minha senha');
  }

  // O método onCadastrar() foi removido, pois agora usamos routerLink para navegação
}