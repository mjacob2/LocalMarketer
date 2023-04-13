import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authhttp: AuthService, private router: Router) {}
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage: string = '';
  isLoading = false;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Wpisz prawidłowy e-mail';
    }

    return this.email.hasError('email') ? 'Nieprawidłowy e-mail' : '';
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    this.errorMessage = '';

    this.authhttp
      .login(email, password)
      .then(() => {
        this.router.navigateByUrl('/');
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }
}
