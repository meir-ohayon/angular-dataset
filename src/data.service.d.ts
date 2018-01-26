import { Http } from '@angular/http';

export declare class DataService {
  constructor(private http: Http);
  getData(dataUrl: string): Observable<any[]>;
  pageList(dataCache: any[], page: number, limit: number): any[];
  searchList(dataCache: any[], search: string, titleFieldName: string): any[];
}
