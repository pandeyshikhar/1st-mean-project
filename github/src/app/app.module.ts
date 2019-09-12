import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { NotableComponent } from './notable/notable.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudComponent } from './crud/crud.component';
import { AddNewComponent } from './add-new/add-new.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    NotableComponent,
    FormLayoutComponent,
    SidebarComponent,
    MapComponent,
    CrudComponent,
    AddNewComponent,
    EditComponent,
    PageNotFoundComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
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
        path: 'new',
        component: AddNewComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
