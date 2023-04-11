import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authhttp: AuthService) {}
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Wpisz prawidłowy e-mail';
    }

    return this.email.hasError('email') ? 'Nieprawidłowy e-mail' : '';
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authhttp.login(email, password);
  }
}
