import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PopupService } from '../../../../shared/services/popup.service';
import { CompanyService } from '../../../../shared/services/company.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.scss']
})
export class SearchCompanyComponent implements OnInit {

  public formByNit: FormGroup;

  public companyResponse = false;
  public responseCompany;

  constructor(
    private fb: FormBuilder,
    private popUp: PopupService,
    private router: Router,
    private company: CompanyService)
    {
      this.createByNitForm();
    }

  ngOnInit(): void {
  }

  createByNitForm() {
    this.formByNit = this.fb.group({
      nit: ['', [Validators.required]]
    });
  }

  searchByNit(){
    if (this.formByNit.valid) {
      var idNit = this.formByNit.get('nit').value;
      this.company.getCompanyInformation(idNit).subscribe((response: any) => {
        if (response) {
          this.companyResponse = true;
          this.responseCompany = response;
        } else {
          this.companyResponse = false;
          this.popUp.noResponseService(response.message, 'Cerrar');
        }
      }, error => {
        this.popUp.errorHttp();
      });
    } else {
      this.formByNit.markAllAsTouched();
      this.popUp.completeFields();
    }
  }

  goToRegister(){
    this.router.navigate(['/registro', this.formByNit.get('nit').value ])
  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  controlError(controlName) {
    const control = this.formByNit.controls[controlName];
    if (control.touched || control.dirty) {
      return control.errors;
    }
  }

}
