import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive } from "@angular/router";
import {FormGroup, FormControl, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router)
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onLoginFormSubmit = () => {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (email && password) {
      this.authService
        .login(email, password)
        .subscribe({
          next: () => {
            void this.router.navigateByUrl("");
          },
          error: (err) => {
            switch (err.code) {
              case "auth/invalid-email":
                this.errorMessage = `Keine valide E-Mail Adresse`;
                break;
              case "auth/invalid-credential":
                this.errorMessage = `E-Mail oder Passwort falsch`;
                break;
              default:
                this.errorMessage = "Ein Fehler ist aufgetreten";
                break;
            }
          }
        })
    }
  }
}
