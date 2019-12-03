import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Record } from 'src/app/model/record'

@Component({
  selector: 'app-list-registry',
  templateUrl: './list-registry.component.html',
  styleUrls: ['./list-registry.component.css']
})
export class ListRegistryComponent implements OnInit {
  list: Record[] = [
    {
      id: 1,
      data: new Date(),
      dayScore: 5
    },
    {
      id: 2,
      data: new Date(),
      dayScore: 3
    }
  ];
  filteredRecords: Observable<string[]>;
  myControl = new FormControl('');
  user: firebase.UserInfo;
  records: any;

  constructor( 
    private router: Router,
    private userService: UserService,
    ) { }

  ngOnInit() {
    // this.filteredRecords = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
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
}
