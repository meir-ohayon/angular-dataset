import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  constructor(private http: Http) {}

  getData(dataUrl: string): Observable<any[]> {
    return this.http.get(dataUrl).map(function(dataRes) { return dataRes.json() || { }; });
  }

  pageList(dataCache: any[], page: number, limit: number = 10): any[] {
    return dataCache.slice((page - 1) * limit, page * limit);
  }
  
  searchList(dataCache: any[], search: string, titleFieldName: string): any[] {
    return dataCache.filter(function(data: Object) { return (search) ? data[titleFieldName].toLowerCase().indexOf(search) !== -1 : true; });
  }
  
}
