import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Record } from 'src/app/model/record';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-registry',
  templateUrl: './list-registry.component.html',
  styleUrls: ['./list-registry.component.css']
})
export class ListRegistryComponent implements OnInit {
  records: string[] = [
    "one",
    "two", 
    "three",
    "25/11/2019"
  ];

  
  list: string[] = [
    "one",
    "two", 
    "three",
    "25/11/2019",
    "one",
    "two", 
    "three",
    "25/11/2019",
    "one",
    "two", 
    "three",
    "25/11/2019",
    "one",
    "two", 
    "three",
    "25/11/2019","one",
    "two", 
    "three",
    "25/11/2019",
    "one",
    "two", 
    "three",
    "25/11/2019",
    "one",
    "two", 
    "three",
    "25/11/2019",
    "one",
    "two", 
    "three",
    "25/11/2019"
  ];
  filteredRecords: Observable<string[]>;
  myControl = new FormControl('');
  user: firebase.UserInfo;

  constructor( 
    private router: Router,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.filteredRecords = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.records.filter(record => record.toLowerCase().includes(filterValue));
  }

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
}
