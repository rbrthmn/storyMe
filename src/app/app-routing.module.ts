import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRegistryComponent } from './components/list-registry/list-registry.component';
import { RegisterComponent } from './components/register/register.component';
import { QuestionsComponent } from './components/questions/questions.component';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'listRegistry',
    pathMatch: "full"
  },
  { 
    path: 'listRegistry', 
    component: ListRegistryComponent 
  },
  { 
    path: 'viewRegister/:id', 
    component: RegisterComponent 
  },
  { 
    path: 'register', 
    component: QuestionsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
