import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-registry',
  templateUrl: './list-registry.component.html',
  styleUrls: ['./list-registry.component.css']
})
export class ListRegistryComponent implements OnInit {

  constructor( 
    private router: Router
    ) { }

  ngOnInit() {
  }

  registerDay = (id: number) => this.router.navigate([`register`]);
}
