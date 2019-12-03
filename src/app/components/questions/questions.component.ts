import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RecordService } from 'src/app/services/record.service';
import RecordInterface, { ratingRange } from 'src/app/interfaces/record.interface';
import { Question } from 'src/app/model/question';
import Answer from 'src/app/interfaces/answer.interface';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  todayDay: Date;
  public question1: ratingRange = 5;
  public questions: Answer<string>[] = [
    {
      order: 1,
      question: { text: "O que você fez hoje?", description: "" },
      answer: ""
    },{
      order: 2,
      question: { text: "O que teve de bom no seu dia? E como você se sente sobre isso?", description: "" },
      answer: ""
    },{
      order: 3,
      question: { text: "O que teve de ruim no seu dia? E como você se sente sobre isso?", description: "" },
      answer: ""
    },{
      order: 4,
      question: { text: "A quem você agradeceria as coisas boas de hoje?", description: "" },
      answer: ""
    },
  ]

  constructor(
    private router: Router,
    private service: RecordService
  ) { }

  ngOnInit() {
    this.todayDay = new Date();
  }

  goBack = () => this.router.navigate([`listRegistry`]);

  public getRecord(): Omit<RecordInterface, 'id' | 'userId'> {
    const record: Omit<RecordInterface, 'id' | 'userId'> = {
      createdAt: this.todayDay,
      lastEditAt: this.todayDay,
      answers: this.questions,
      rating: {
        answer: this.question1 || 1
      },

    };
    return record;
  }

  public async save() {
    await this.service.addRecord(this.getRecord());
    this.goBack();
  }

}
