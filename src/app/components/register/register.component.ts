import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import RecordInterface from 'src/app/interfaces/record.interface';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  recordDay: Date = new Date();
  record: RecordInterface
  recordId: string;

  constructor(
    private router: Router,
    private _actvatedRoute: ActivatedRoute,
    private recordService: RecordService
  ) { }

  ngOnInit() {
    this.recordId = this._actvatedRoute.snapshot.paramMap.get('id')
    this.getRecord();
    //WIP: GET THE RECORD WITH ID
  }

  goBack = () => this.router.navigate([`listRegistry`]);
  async getRecord(){
    const searchRecord = await this.recordService.getSingleRecord(this.recordId);
    console.log(searchRecord.rating);
    this.record = searchRecord;
  }
}
