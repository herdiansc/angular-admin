import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const appRoutes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    data: { title: 'Employee List' },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'employee/detail/:id',
    component: EmployeeDetailComponent,
    data: { title: 'Employee Details' }
  },
  {
    path: 'employee/add',
    component: EmployeeAddComponent,
    data: { title: 'Employee Add' }
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
    data: { title: 'Employee Edit' }
  },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent
  ],
  imports: [
  	RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
  	FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
