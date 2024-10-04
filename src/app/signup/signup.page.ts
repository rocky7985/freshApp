import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  signupForm: FormGroup;
  isSubmit: boolean = false;
  showPassword:boolean=false;
  showConfirmPassword:boolean=false;

  constructor(
    public CommonService: CommonserviceService,
    public router: Router
  ) {
    this.signupForm = new FormGroup({
      role: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, this.PasswordMatchValidator);
  }

  PasswordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  register() {
    if (this.signupForm.valid) {
      this.isSubmit = true;

      if (this.signupForm.value.role == 'seller') {
        this.signupForm.value.sellerId = Math.floor(Math.random() * 1000) + 1;
      }

      else if (this.signupForm.value.role == 'customer') {
        this.signupForm.value.customerId = Math.floor(Math.random() * 1000) + 1;
      }

      let getDetails = localStorage.getItem('signup');
      let getForm = getDetails ? JSON.parse(getDetails) : [];

      let existingEmails = getForm.map((e: any) => e.email);
      const enteredEmail = this.signupForm.value.email;
      if (existingEmails.includes(enteredEmail)) {
        this.CommonService.presentToast('Email is already in use.Pls choose another');
        return;
      }

      getForm.push(this.signupForm.value);
      localStorage.setItem('signup', JSON.stringify(getForm));
      this.CommonService.presentToast('Registration Successful');
      console.log('User SignUp Details:', this.signupForm.value);
      this.signupForm.reset();
      this.router.navigate(['/login']);
    }
    else {
      this.signupForm.invalid;
      console.log('Form Invalid.Cannot Signup');
      this.CommonService.presentToast('An error Occurred.');
    }
    this.isSubmit = false;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
