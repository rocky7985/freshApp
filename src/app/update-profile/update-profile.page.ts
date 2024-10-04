import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage {

  updateForm: FormGroup;
  isSubmit: boolean = false;
  userDetails: any = [];
  loginUser: any = [];


  constructor(
    public CommonService: CommonserviceService,
    public router: Router
  ) {
    this.updateForm = new FormGroup({
      role: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      address: new FormControl('', Validators.required),
    });
  }

  ionViewWillEnter() {
    this.getlogin();
    this.getUserdata();
  }

  getlogin() {
    const user = JSON.parse(localStorage.getItem('login') || '[]');
    this.loginUser = user;
    console.log('LoginData:', this.loginUser);
  }

  getUserdata() {
    if (this.loginUser) {
      this.isSubmit = true;
      this.updateForm.patchValue({
        name: this.loginUser.name,
        address: this.loginUser.address,
        phone: this.loginUser.phone,
        email: this.loginUser.email,
        role: this.loginUser.role
      });
      this.userDetails = this.loginUser;
      this.isSubmit = false;
    }
    else {
      console.log('Error loading profile data:');
    }
  }

  updateData() {
    this.isSubmit = true;
    let customerData = JSON.parse(localStorage.getItem('signup') || '[]');
    const findCustomer = customerData.findIndex((c: any) => c.email == this.userDetails.email);
    if (findCustomer != -1) {
      customerData[findCustomer] = this.updateForm.value;
      localStorage.setItem('signup', JSON.stringify(customerData));
    }
    localStorage.setItem('login', JSON.stringify(this.updateForm.value));
    this.isSubmit = false;
    this.CommonService.presentToast('Profile updated successfully');
    console.log('Updated Data:', JSON.stringify(this.updateForm.value));
  }

}
