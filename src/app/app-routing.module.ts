import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRegistryComponent } from './components/list-registry/list-registry.component';
import { RegisterComponent } from './components/register/register.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'signin',
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
  },
  {
    path: 'signin',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
