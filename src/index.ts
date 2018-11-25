import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './data.service.js';
export { DataService } from './data.service.js';

import { SearchListComponent } from './search-list/search-list.component';
import { PaginationComponent } from './pagination/pagination.component';

import { SortDirective } from './sorting/sort.directive';
export { SortDirective } from './sorting/sort.directive';

@NgModule({
    imports: [ CommonModule, HttpClientModule ],
    declarations: [
        SearchListComponent,
        PaginationComponent,
		SortDirective
    ],
    exports: [
        SearchListComponent,
        PaginationComponent,
		SortDirective
    ]
})

export class AngularDataset {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: AngularDataset, providers: [ DataService ] };
    }
}
