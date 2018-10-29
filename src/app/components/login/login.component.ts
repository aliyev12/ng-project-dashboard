import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessages.show('You are now logged in', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/']);
      })  /* END OF THEN */
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
        this.flashMessages.show('User was not found. Please, make sure you\'ve types the right username and/or password', {
          cssClass: 'alert-danger', timeout: 4000
        });
        } else {
          this.flashMessages.show(err, {
            cssClass: 'alert-danger', timeout: 4000
          });
        }
      }); /* END OF CATCH */
  }

}
