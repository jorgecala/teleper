import { Routes } from "@angular/router";
import { SearchCompanyComponent } from './search-company/search-company.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';

export const CompanyRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SearchCompanyComponent,
      },
      {
        path: "registro/:id",
        component: RegisterCompanyComponent,
      },
    ],
  },
];
