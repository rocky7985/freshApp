import { Component } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  isSubmit: boolean = false;
  details: any = [];
  loginUser: any = [];

  constructor(
    public CommonService: CommonserviceService,
    public router: Router
  ) { }

  ionViewWillEnter() {
    this.getlogin();
    this.getProfile();
  }

  getlogin() {
    const user = JSON.parse(localStorage.getItem('login') || '[]');
    this.loginUser = user;
    console.log('LoginData:', this.loginUser);
  }

  getProfile() {
    this.isSubmit = true;
    if (this.loginUser) {
      this.details = this.loginUser;
      console.log('Profile Data:', this.details);
      this.isSubmit = false;
    }
    else {
      console.log('Error loading data');
      this.isSubmit = false;
    }
  }

  navigateToupdate() {
    this.router.navigate(['/update-profile']);
  }

}
