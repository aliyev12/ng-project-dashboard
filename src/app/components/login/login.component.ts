import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService,
    // private flashMessages: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        // this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.email, this.password)
      .then(res => {
        // this.flashMessages.show('You are now logged in', {
        //   cssClass: 'alert-success', timeout: 4000
        // });
        this.router.navigate(['/']);
      })  /* END OF THEN */
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
        // this.flashMessages.show('User was not found. Please, make sure you\'ve types the right username and/or password', {
        //   cssClass: 'alert-danger', timeout: 4000
        // });
        } else {
          // this.flashMessages.show(err, {
          //   cssClass: 'alert-danger', timeout: 4000
          // });
        }
      }); /* END OF CATCH */
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
