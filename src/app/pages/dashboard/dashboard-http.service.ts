import { Injectable } from '@angular/core';
import { DashBoardManagementApiService } from '@vks/app/https/dashboard-management/dashboard-management-api.service';

@Injectable()
export class DashboardHttpService {
  constructor(
    private dashboardManagementApiService: DashBoardManagementApiService
  ) {}

  getData(params: any) {
    if (!params) {
      // Kiểm tra undefined trước khi gọi toString()
      console.error('someVariable is undefined');
    }
    return this.dashboardManagementApiService.getData(params);
  }
}
