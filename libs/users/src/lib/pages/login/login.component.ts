import { LocalstorageService } from './../../services/localstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router) { }

  ngOnInit(): void {
    this._initLoginForm();
  }
  private _initLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    this.isSubmitted = true;

    if(this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe({
      //next: user => {this.authError = false; console.log(user)},
      next: user => {
        this.authError = false;
        this.localstorageService.setToken(user.token)
        this.router.navigate(['/'])
      },
      error: (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
         return this.authMessage = 'Error in the Server, please try again later!';
        }
        this.authMessage = error.error
      }
    })
  }

  get loginForm(){
    return  this.loginFormGroup.controls;
  }
}
