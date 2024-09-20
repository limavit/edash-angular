import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgxMaskDirective, NgxMaskPipe],
  providers: [AuthService, provideNgxMask()],
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
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log('onSubmit chamado');
    console.log('Formulário válido:', this.registerForm.valid);
    
    if (this.registerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      console.log('Formulário válido, enviando para API...');
      const formData = {...this.registerForm.value};
      formData.cpf = formData.cpf.replace(/\D/g, '');
      
      this.authService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          this.isSubmitting = false;
          this.router.navigate(['/login']);
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