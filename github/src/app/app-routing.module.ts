import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotableComponent } from './notable/notable.component';
import { MapComponent } from './map/map.component';
import { CrudComponent } from './crud/crud.component';
import { AddNewComponent } from './add-new/add-new.component';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';







const routes: Routes = [
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'form',
    component: FormLayoutComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reg',
    component: RegisterComponent
  },
  {
    path: 'no',
    component: NotableComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'crud',
    component: CrudComponent
  },
  {
    path: 'crud/new',
    component: AddNewComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  }
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
