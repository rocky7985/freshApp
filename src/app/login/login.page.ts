import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;
  showPassword: boolean = false;
  loadData: boolean = false;

  constructor(
    public CommonService: CommonserviceService,
    public router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  ionViewWillEnter() {
    this.rememberMe();
    this.loadData = false;
  }

  rememberMe() {
    const remember = JSON.parse(localStorage.getItem('remember') || '[]');
    if (remember) {
      this.loginForm.patchValue({
        email: remember.email,
        password: remember.password,
        rememberMe: true
      });
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.loadData = true;

      const userdata = JSON.parse(localStorage.getItem('signup') || '[]');

      const enteredEmail = this.loginForm.value.email;
      const enteredPassword = this.loginForm.value.password;

      const user = userdata.find((e: any) => e.email == enteredEmail && e.password == enteredPassword);
      // console.log('User:', user);

      if (user) {
        localStorage.setItem('login', JSON.stringify(user));
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('remember', JSON.stringify(this.loginForm.value));
          }else {
            localStorage.removeItem('remember');
          }
        this.CommonService.presentToast('Login Successful');
        this.loginForm.reset();
        console.log('Login Details:', user);
        this.router.navigate(['/home']);
      }
      else {
        this.CommonService.presentToast('Invalid email or password');
      }
      this.loadData = false;
    }
    else {
      console.log('Form is invalid. Cannot login.');
      this.loadData = false;
    }
  }
  changeType() {
    this.showPassword = !this.showPassword;
  }
}
