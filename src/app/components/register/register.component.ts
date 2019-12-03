import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import RecordInterface from 'src/app/interfaces/record.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  record: RecordInterface =
    {
      userId: "",
      id: "",
      rating: {
        order: 0,
        question: {
          text: "Como foi seu ",
          description: "",
        },
        answer: 1,
      },
      createdAt: new Date(),
      lastEditAt: new Date(),
      answers: [
        {
          order: 0,
          question: {
            text: "Como foi seu dia",
            description: "",
          },
          answer: 1,
        },
        {
          order: 0,
          question: {
            text: "Oque você fez hoje?",
            description: "",
          },
          answer: "Nada",
        },
        {
          order: 0,
          question: {
            text: "O que teve de bom no seu dia? E como você se sente sobre isso?",
            description: "",
          },
          answer: "Comi pizza",
        },
        {
          order: 0,
          question: {
            text: "O que teve de ruim no seu dia? E como você se sente sobre isso?",
            description: "",
          },
          answer: "Fiquei sem gasosa",
        },
        {
          order: 0,
          question: {
            text: "A quem você agradeceria as coisas boas de hoje?",
            description: "",
          },
          answer: "A mim mesmo",
        },
      ],
    };

  recordDay: Date = new Date();
  answer: string[] = [
    "1",
    "nada",
    "comi pizza",
    "sem gasosa",
    "a mim mesmo"
  ];

  constructor(
    private router: Router,
    private _actvatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    let recordId = this._actvatedRoute.snapshot.paramMap.get('id')
    console.log(recordId)
    //WIP: GET THE RECORD WITH ID
  }

  goBack = () => this.router.navigate([`listRegistry`]);
}
