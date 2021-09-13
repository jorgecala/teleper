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
  public formCompanyInformation: FormGroup;

  public companyResponse = false;
  public responseCompany;

  public personType = [
    {
      id: 1,
      name: 'NATURAL'
    },
    {
      id: 2,
      name: 'JURÍDICA'
    }
  ];

  public address;

  constructor(
    private fb: FormBuilder,
    private popUp: PopupService,
    private router: Router,
    private company: CompanyService)
    {
      this.createByNitForm();
      this.createCompanyInformationForm();
    }

  ngOnInit(): void {

  }

  createByNitForm() {
    this.formByNit = this.fb.group({
      nit: ['', [Validators.required]]
    });
  }

  createCompanyInformationForm() {
    this.formCompanyInformation = this.fb.group({
      naturaleza: [''],
      razon_social: [''],
      via: [''],
      nro1: [''],
      letra1: [''],
      nro2: [''],
      letra2: [''],
      complementos: [''],
      direccion: [''],
      municipio: [''],
      telefono1: [''],
    });
    this.formCompanyInformation.disable();
  }

  searchByNit(){
    if (this.formByNit.valid) {
      var idNit = this.formByNit.get('nit').value;
      this.company.getCompanyInformation(idNit).subscribe((response: any) => {
        if (response.isSuccess) {
          this.companyResponse = true;
          this.responseCompany = response.data;
          var address = this.responseCompany.detailed_address;
          address = address.replace(/,*/g, "");
          this.address = address.split("|");
          this.formCompanyInformation.patchValue({
            naturaleza: this.responseCompany.type_of_nature,
            razon_social: this.responseCompany.name_company,
            via: this.address[0],
            nro1: this.address[1],
            letra1: this.address[2],
            nro2: this.address[3],
            letra2: this.address[4],
            complementos: this.address[5],
            direccion: this.responseCompany.address,
            municipio: this.responseCompany.municipality,
            telefono1: this.responseCompany.phone,
          });
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
