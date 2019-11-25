import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.todayDay = new Date();
  }

    goBack = (id: number) => this.router.navigate([`listRegistry`]);
}
