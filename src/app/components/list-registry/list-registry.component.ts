import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Record } from 'src/app/model/record'
import { RecordService } from 'src/app/services/record.service';
import { JsonPipe } from '@angular/common';
import RecordInterface from 'src/app/interfaces/record.interface';

@Component({
  selector: 'app-list-registry',
  templateUrl: './list-registry.component.html',
  styleUrls: ['./list-registry.component.css']
})
export class ListRegistryComponent implements OnInit {
  list: RecordInterface[] = [];
  filteredRecords: Observable<string[]>;
  myControl = new FormControl('');
  user: firebase.UserInfo;
  records: any;
  date: Date;

  constructor( 
    private router: Router,
    private userService: UserService, 
    private recordService: RecordService
    ) {
     }

  ngOnInit() {
    this.date = new Date();
    this.search();
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.records.filter(record => record.toLowerCase().includes(filterValue));
  // }

  registerDay = (id: number) => this.userService.user.subscribe((user) => {
    if (this.userService.user !== null || this.userService.user !== undefined) {
      this.router.navigate([`register`]);
    } else {
      console.log("Usuário precisa estar logado!");
    }
  })

  signOut() {
    this.userService.googleSignOut();
    this.router.navigate([`signin`]);
  }

  selectItem(id:  number) {
    this.router.navigate([`viewRegister/${id}`]);
  }

  async search(){
    let records = await this.recordService.searchByDate(this.date);
    this.list = records;
    console.log(`${records.length}`);
  }
}
