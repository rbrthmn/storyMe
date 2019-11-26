import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegistryComponent } from './list-registry.component';

describe('ListRegistryComponent', () => {
  let component: ListRegistryComponent;
  let fixture: ComponentFixture<ListRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
