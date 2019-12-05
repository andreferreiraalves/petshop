import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf(),
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required,
      ])]
    });
  }

  ngOnInit() {
    // Código pode ser colocado dentro do APPComponent, aplicação 100% restrita
    const token = Security.getToken();
    if (token) {
      this.busy = true;

      this.service
        .refreshToken()
        .subscribe(
          (data: any) => {
            this.busy = false;
            this.setUser(data.customer, data.token);
          },
          (err) => {
            Security.clear();
            this.busy = false;
          }
        );
    }
  }

  submit() {
    this.busy = true;

    this.service.authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      );
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }
}
