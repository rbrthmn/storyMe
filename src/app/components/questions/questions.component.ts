import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  todayDay: Date;
  qustion1: number;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  user: firebase.UserInfo;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.todayDay = new Date();
  }

  goBack = () => this.router.navigate([`listRegistry`]);

  save() {
    this.userService.user.subscribe((user) => {
      if (this.userService.user !== null || this.userService.user !== undefined) {
        this.router.navigate([`listRegistry`]);
      } else {
        console.log("Usuário precisa estar logado!", this.userService.user);
      }
    })
  }

}
