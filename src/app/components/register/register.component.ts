import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  recordDay: Date = new Date();
  answer: string[] = [
    "1",
    "nada",
    "comi pizza",
    "sem gasosa",
    "a mim mesmo"
    ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack = () => this.router.navigate([`listRegistry`]);
}
