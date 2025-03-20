import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseManagementComponent } from './screens/case-management.component';
import { CaseManagementRoutingModule } from './case-management-routing.module';
import { CaseManagementHttpService } from './case-management-http.service';
import { CaseManagementStateService } from './case-management-state.service';
import { FilterCommonComponent } from '../../shared/ui-common/filter-common/filter-common.component';
import { TableCommonComponent } from '../../shared/ui-common/table-common/table-common.component';
import { ButtonModule } from 'primeng/button';
import { FormAccountComponent } from './screens/components/form-account/form-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ButtonDirective } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [CaseManagementComponent, FormAccountComponent],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    FilterCommonComponent,
    TableCommonComponent,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    FileUploadModule,
    DropdownModule,
    PasswordModule,
    ButtonDirective,
    ToastModule,
    RippleModule,
    MenuModule,
  ],
  providers: [CaseManagementHttpService, CaseManagementStateService],
})
export class CaseManagementModule {}
