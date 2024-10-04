import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router
  ) { }

  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
    console.log('Logout Clicked');
  }

  navigateToTask() {
    this.router.navigate(['/todo-task']);
  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }
}
