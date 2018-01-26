import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service.js';
export { DataService } from './data.service.js';

import { SearchListComponent } from './search-list/search-list.component.js';
import { PaginationComponent } from './pagination/pagination.component.js';

@NgModule({
    imports: [ CommonModule, HttpModule ],
    declarations: [
        SearchListComponent,
        PaginationComponent
    ],
    exports: [
        SearchListComponent,
        PaginationComponent
    ]
})

export class AngularDataset {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: AngularDataset, providers: [ DataService ] };
    }
}
