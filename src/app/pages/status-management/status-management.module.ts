import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusManagementComponent } from './screens/status-management.component';
import { StatusManagementRoutingModule } from './status-management-routing.module';
import { StatusManagementStateService } from './status-management-state.service';
import { StatusManagementHttpService } from './status-management-http.service';
import { FilterCommonComponent } from '../../shared/ui-common/filter-common/filter-common.component';

@NgModule({
  declarations: [StatusManagementComponent],
  imports: [CommonModule, StatusManagementRoutingModule, FilterCommonComponent],
  providers: [StatusManagementStateService, StatusManagementHttpService],
})
export class StatusManagementModule {}
