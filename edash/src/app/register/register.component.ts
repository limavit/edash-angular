import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    console.log('RegisterComponent construtor chamado');
  }

  ngOnInit() {
    console.log('RegisterComponent ngOnInit chamado');
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log('onSubmit chamado');
    console.log('Formulário válido:', this.registerForm.valid);
    
    if (this.registerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      console.log('Formulário válido, enviando para API...');
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          this.isSubmitting = false;
          // Redirecionar para a página de login ou dashboard após o cadastro
          this.router.navigate(['/login']); // Ajuste o caminho conforme necessário
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
          this.isSubmitting = false;
          // Adicione aqui a lógica para mostrar mensagem de erro
        }
      });
    } else if (!this.registerForm.valid) {
      console.log('Formulário inválido, verifique os campos');
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        console.log(`${key} válido:`, control?.valid);
        console.log(`${key} erros:`, control?.errors);
      });
    }
  }
}