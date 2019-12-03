import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: firebase.UserInfo;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.userService.user.subscribe((user) => {
    //   if (this.userService.user !== null) {
    //     this.router.navigate([`listRegistry`]);
    //     console.log(this.userService.user)
    //   }
    // })
  }

  async signin() {
    await this.userService.googleSignIn();
    this.router.navigate([`listRegistry`]);
  }

}
