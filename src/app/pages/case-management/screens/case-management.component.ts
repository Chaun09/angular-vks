import { CaseForm } from './../../account-management/models/interfaces';
import { Component, OnInit } from '@angular/core';
import { CaseManagementHttpService } from '../case-management-http.service';
import { DEFAULT_TABLE_PAGE, DEFAULT_TABLE_SIZE } from '@vks/app/shared/models';
import {
  ConfigHeaderCase,
  DefaultFilterDataCase,
  FilterConfigCase,
} from '../models/constants';
import { LoadingService } from '@vks/app/services';
import { delay, finalize, takeUntil } from 'rxjs';
import {
  ICaseResponse,
  AllCaseResponse,
} from '@vks/app/https/case-management/interface.ts';
import { ListAccountActionConfig } from '@vks/app/pages/account-management/models';

@Component({
  selector: 'vks-case-management',
  templateUrl: './case-management.component.html',
  styleUrl: './case-management.component.scss',
})
export class CaseManagementComponent implements OnInit {
  readonly title = 'Danh sách vụ án';
  readonly filterConfigCase = FilterConfigCase;
  readonly configHeaderCase = ConfigHeaderCase;
  isVisibleModal = false;
  page = DEFAULT_TABLE_PAGE;
  actionConfig = [...ListAccountActionConfig];
  pageSize = DEFAULT_TABLE_SIZE;
  defaultFilterDataCase = DefaultFilterDataCase;
  listAccount: AllCaseResponse[] = [
    {
      id: 0,
      code: 'VA0001',
      name: 'Vụ án giết chó ở Kim Hoa',
      case_type: 'HINH_SU',
      description: 'đây là vụ án phức tạp vì kbt hung thủ là ai',
      actualTime: '2021-09-01',
    },
  ];
  totalRecord: number = 0;
  constructor(
    private caseManagementHttpService: CaseManagementHttpService,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.handleGetCaseManagement();
  }
  createCase() {}

  onFilter(filter: any) {
    console.log(filter);
  }
  onOpenModal() {
    this.isVisibleModal = true;
  }
  onCloseModal() {
    this.isVisibleModal = false;
  }
  onSubmit(form: CaseForm) {}
  handleGetCaseManagement() {
    // this.loadingService.showLoading(true)
    // this.caseManagementHttpService
    //     .getListCaseManagement(this.defaultFilterDataCase, this.pageSize, this.page)
    //     .pipe(
    //         delay(2000),
    //         finalize(() => this.loadingService.showLoading(false)),
    //         takeUntil(this.destroyService),
    //     )
    //     .subscribe((listData) => {
    //         console.log(listData)
    //         this.listCase = listData.result.content
    //         this.totalRecord = listData.result.totalRecords
    //     })
  }
}
