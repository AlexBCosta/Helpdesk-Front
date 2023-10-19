import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

  
const routes: Routes = [
  {
    path:'',
    component: NavComponent, children: [ //children filhos da nav, renderiza dentro do conteúdo
      {path: 'home', component: HomeComponent} ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
