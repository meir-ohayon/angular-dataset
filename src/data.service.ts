import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData(dataUrl: string) {
    return this.http.get(dataUrl);
  }

  pageList(dataCache: any[], page: number, limit: number = 10): any[] {
    return dataCache.slice((page - 1) * limit, page * limit);
  }
  
  searchList(dataCache: any[], search: string, titleFieldName: string): any[] {
    return dataCache.filter(function(data: Object) { return (search) ? data[titleFieldName].toLowerCase().indexOf(search) !== -1 : true; });
  }
  
}
