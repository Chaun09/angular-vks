import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { IDropdownItem, REGEX_PHONE_NUMBER } from '@vks/app/shared/models';
import { CaseForm } from '@vks/app/pages/account-management/models';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'vks-form-account',
  templateUrl: './form-account.component.html',
  styleUrl: './form-account.component.scss',
})
export class FormAccountComponent {
  @Input()
  errors: Record<keyof CaseForm, string[]> = {
    username: [],
    avatar: [],
    fullName: [],
    roleId: [],
    departmentId: [],
    organizationId: [],
    phoneNumber: [],
    password: [],
  };

  @Input()
  accountDetail: Partial<CaseForm> = {
    username: '',
    avatar: '',
    fullName: '',
    roleId: null,
    departmentId: null,
    organizationId: null,
    phoneNumber: '',
    password: '',
  };

  @Output()
  unActiveForm = new EventEmitter();

  @Output() forward = new EventEmitter<CaseForm>();

  @ViewChild('avatarInput') avatarInput: FileUpload | null = null;

  submitted = false;
  imageForUpload: (File & { objectURL: string }) | null = null;

  listDepartments: IDropdownItem[] = [
    { label: 'Phòng ban 1', value: '1' },
    { label: 'Phòng ban 2', value: '2' },
  ];
  listRoles: IDropdownItem[] = [
    { label: 'Chức vụ 1', value: '1' },
    { label: 'Chức vụ 2', value: '2' },
  ];
  listUnits: IDropdownItem[] = [
    { label: 'Đơn vị 1', value: '1' },
    { label: 'Đơn vị 2', value: '2' },
  ];

  caseForm: FormGroup = this.formBuilder.group({
    casename: ['', [Validators.required]],
    casecode: ['', Validators.required],
    description: ['', [Validators.required]],
    casetype: [null, [Validators.required]],
    departmentId: [null, [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {}

  onSelectAvatar(event: FileSelectEvent) {
    const files = event.files;
    if (Array.from(files).length) {
      const file = files[0];
      const objectURL = URL.createObjectURL(new Blob([file]));
      this.imageForUpload = {
        ...file,
        objectURL,
      };
      this.caseForm.controls['avatar'].setValue('objectURL');
    }

    if (this.avatarInput?.files.length) {
      this.avatarInput.clearInputElement();
      this.avatarInput.clearIEInput();
      this.avatarInput.clear();
    }
  }

  onRemoveAvatar() {
    this.imageForUpload = null;
    this.caseForm.controls['avatar'].setValue('');
    console.log('avatarInput', this.avatarInput);
    if (this.avatarInput?.files) {
      this.avatarInput.clearInputElement();
      this.avatarInput.clearIEInput();
      this.avatarInput.clear();
    }
  }

  onSubmit() {
    console.log('this.caseForm.valid', this.caseForm.valid);
    if (this.caseForm.valid) {
      this.submitted = false;
      this.forward.emit(this.caseForm.value);
    } else {
      this.submitted = true;
      this.caseForm.markAllAsTouched();
    }
  }

  onCloseModal() {
    this.unActiveForm.emit();
    this.resetForm();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.caseForm.get(fieldName);
    return (field?.errors?.required &&
      field.touched &&
      this.submitted) as boolean;
  }

  isPhoneNumberInvalid(fieldName: string): boolean {
    const field = this.caseForm.get(fieldName);
    return (field?.errors?.pattern &&
      field?.touched &&
      this.submitted) as boolean;
  }

  resetForm() {
    this.submitted = false;
    this.caseForm.reset({
      username: '',
      avatar: '',
      fullName: '',
      roleId: null,
      departmentId: null,
      organizationId: null,
      phoneNumber: '',
      password: { value: '', disabled: true },
    });

    this.imageForUpload = null;
    if (this.avatarInput) {
      this.avatarInput.clearInputElement();
      this.avatarInput.clearIEInput();
      this.avatarInput.clear();
    }

    Object.keys(this.caseForm.controls).forEach((key) => {
      const control = this.caseForm.get(key) as FormControl;
      control.markAsPristine();
      control.markAsUntouched();
      control.updateValueAndValidity();
    });
  }
}
