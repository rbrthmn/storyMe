import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Record } from 'src/app/model/record';

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

  constructor( 
    private router: Router
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

  registerDay = (id: number) => this.router.navigate([`register`]);
}
