import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-administration-demo';

  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) {};

  tokenChange() {
    const key = "9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN";
    let data = localStorage.getItem('api') || JSON.stringify("Default value");
    data = JSON.parse(data);
    if (data === key) {
      localStorage.removeItem('api');
      this.toastr.success('Successfully logged out!');
      this.router.navigate(['/']);
    } else {
      localStorage.setItem('api', JSON.stringify(key));
      this.toastr.success('Successfully logged in!');
      this.router.navigate(['/admin']);
    }
  }
}


@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {};

  canActivate() {
    const key = "9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN";
    let data = localStorage.getItem('api') || JSON.stringify("Default value");
    data = JSON.parse(data);
    if (data === key) {
      return true;
    } else {
      this.toastr.error('Please login!');
      this.router.navigate(['/']);
      return false;
    }
  }
}
