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


  constructor(private http: HttpClient) { }



  private getList(query: string) {
    const url = `${this.dataTypes}${query}`;
    return this.http.get(url).pipe(map((x: any) => x.result ));
  }

  listIdentification() {
    return this.getList('GetAllIdentificationType');
  }

  registerCompanyInformation(data) {
    const url = `${this.company}Update`;
    return this.http.post(url, data);
  }

  getCompanyInformation(nit) {
    const url = `${this.company}GetCompanybyNit/${nit}`;
    return this.http.get(url);
  }

}
