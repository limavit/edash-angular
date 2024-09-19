import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 5 fields', () => {
    expect(component.registerForm.contains('name')).toBeTruthy();
    expect(component.registerForm.contains('phone')).toBeTruthy();
    expect(component.registerForm.contains('birthDate')).toBeTruthy();
    expect(component.registerForm.contains('cpf')).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTruthy();
  });
});