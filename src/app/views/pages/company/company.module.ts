import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCompanyComponent } from './search-company/search-company.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RouterModule } from '@angular/router';
import { CompanyRoutes } from './company.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [SearchCompanyComponent, RegisterCompanyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CompanyModule { }
