import { HttpClient } from '@angular/common/http';

export declare class DataService {
  constructor(private http: HttpClient);
  getData(dataUrl: string);
  pageList(dataCache: any[], page: number, limit: number): any[];
  searchList(dataCache: any[], search: string, titleFieldName: string): any[];
}
