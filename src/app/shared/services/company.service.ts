import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private dataTypes = environment.dataTypes;
  private company = environment.company;
  private companyUser = environment.companyUser;


  constructor(private http: HttpClient) { }



  listIdentification() {
    const url = `${this.dataTypes}GetAllIdentificationType`;
    return this.http.get(url);
  }

  registerCompanyInformation(data) {
    const url = `${this.companyUser}Update`;
    return this.http.post(url, data);
  }

  getCompanyInformation(nit) {
    const url = `${this.company}GetCompanybyNit/${nit}`;
    return this.http.get(url);
  }

  getActuallyInformation(nit) {
    const url = `${this.companyUser}Get/${nit}`;
    return this.http.get(url);
  }

}
