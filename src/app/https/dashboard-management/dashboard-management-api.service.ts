import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaginationParams, IYear } from 'src/app/shared/models';
import { IBaseResponse } from 'src/app/https/base-response.interface';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { HttpHeaders } from '@angular/common/http';
import { IDashBoardRes } from './interface.ts';

@Injectable({
  providedIn: 'root',
})
export class DashBoardManagementApiService {
  constructor(private http: HttpClient) {}
  private token =
    'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVklFTl9UUlVPTkciLCJrZXlVc2IiOiJkZmExZDBjNi03NmZmLTExZWYtODg0Yy0wMjQyYWMxMjAwMDIiLCJzdWIiOiJNQ0IwMDIiLCJpYXQiOjE3NDI4Njc3MzAsImV4cCI6MTc0Mjk1NDEzMH0.qwvf9U2qWRs58UGv-Yq0nFGr5oz7PBzgEg8uD4RxqvQ';
  getData(params: any): Observable<IDashBoardRes<Array<number>>> {
    const httpParams = params
      ? new HttpParams({
          fromObject: {
            year: params,
          },
        })
      : new HttpParams();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    console.log('Headers:', headers);
    return this.http.get<IDashBoardRes<Array<number>>>(
      'http://localhost:8081/api/v1/private/cases/dashboard',
      {
        params: httpParams,
        headers,
        withCredentials: true,
      }
    );
  }
}
