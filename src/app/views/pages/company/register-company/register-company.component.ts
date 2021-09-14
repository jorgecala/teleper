import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupService } from '../../../../shared/services/popup.service';
import { CompanyService } from '../../../../shared/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {

  public formRegister: FormGroup;
  public emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  public viewFields = {
    NATURAL_PERSON: false,
    JURIDIC_PERSON: false,
  }

  public documentTypes;

  public actualInformation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private popUp: PopupService,
    private company: CompanyService)
    {
      this.createRegisterForm();
    }

  ngOnInit(): void {
    const idNit = this.route.snapshot.paramMap.get('id');
    if(idNit === '') {
      this.router.navigateByUrl('/');
    } else {
      this.company.listIdentification().subscribe((response: any) => {
        this.documentTypes = response.data;
      });
      this.company.getActuallyInformation(idNit).subscribe((response: any) => {
        if (response.isSuccess) {
          this.actualInformation = response.data;
          this.formRegister.patchValue({
            identification_type: this.actualInformation.identification_type,
            identification_number: this.actualInformation.identification_number,
            company_name: this.actualInformation.company_name,
            first_name: this.actualInformation.first_name,
            second_name: this.actualInformation.second_name,
            first_lastname: this.actualInformation.first_last_name,
            second_lastname: this.actualInformation.second_last_name,
            email: this.actualInformation.email,
            email_sending: this.actualInformation.authorize_sending_mobil,
            sms_sending: this.actualInformation.authorize_sending_email,
          });
          this.viewFieldsDocument();
        }
      });
    }
  }

  createRegisterForm(){
    this.formRegister = this.fb.group({
      identification_type: ['', [Validators.required]],
      identification_number: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      second_name: [''],
      first_lastname: ['', [Validators.required]],
      second_lastname: [''],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      email_sending: [],
      sms_sending: [],
    });
  }

  saveRegister() {
    if (this.formRegister.valid) {
      const data = {
        id: 0,
        identification_type: this.formRegister.get('identification_type').value,
        identification_number: this.formRegister.get('identification_number').value,
        company_name: this.formRegister.get('company_name').value,
        first_name: this.formRegister.get('first_name').value,
        id_company: 1,
        second_name: this.formRegister.get('second_name').value,
        first_last_name: this.formRegister.get('first_lastname').value,
        second_last_name: this.formRegister.get('second_lastname').value,
        email: this.formRegister.get('email').value,
        authorize_sending_mobil: this.formRegister.get('email_sending').value,
        authorize_sending_email: this.formRegister.get('sms_sending').value,
      }
      this.company.registerCompanyInformation(data).subscribe((response: any) => {
        if (response.isSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: response.message,
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'swalConfirmButton'
            },
            allowEscapeKey: false,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        } else {
          this.popUp.noResponseService(response.message, 'Cerrar');
        }
      }, error => {
        this.popUp.errorHttp();
      });
    } else {
      this.formRegister.markAllAsTouched();
      this.popUp.completeFields();
    }
  }

  viewFieldsDocument() {
    const documentSelected = this.formRegister.get('identification_type').value;
    if(documentSelected === '6') {
      this.viewFields.NATURAL_PERSON = false;
      this.viewFields.JURIDIC_PERSON = true;
      this.formRegister.controls['first_name'].clearValidators();
      this.formRegister.controls['first_name'].updateValueAndValidity();
      this.formRegister.controls['first_lastname'].clearValidators();
      this.formRegister.controls['first_lastname'].updateValueAndValidity();
      this.formRegister.controls['company_name'].setValidators([Validators.required]);
      this.formRegister.controls['company_name'].updateValueAndValidity();
      this.formRegister.patchValue({
        first_name: '',
        second_name: '',
        first_lastname: '',
        second_lastname: '',
      });
    } else {
      this.viewFields.NATURAL_PERSON = true;
      this.viewFields.JURIDIC_PERSON = false;
      this.formRegister.controls['first_name'].setValidators([Validators.required]);
      this.formRegister.controls['first_name'].updateValueAndValidity();
      this.formRegister.controls['first_lastname'].setValidators([Validators.required]);
      this.formRegister.controls['first_lastname'].updateValueAndValidity();
      this.formRegister.controls['company_name'].clearValidators();
      this.formRegister.controls['company_name'].updateValueAndValidity();
      this.formRegister.patchValue({
        company_name: '',
      });
    }
  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  alphabeticOnly(event): boolean {
    let patt = /^([a-zA-ZÀ-ÿZñÑáéíóúÁÉÍÓÚ\u00f1\u00d1s ])$/;
    let result = patt.test(event.key);
    return result;
  }

  controlError(controlName) {
    const control = this.formRegister.controls[controlName];
    if (control.touched || control.dirty) {
      return control.errors;
    }
  }

}
