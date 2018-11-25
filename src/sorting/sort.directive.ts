import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[sortable]'
})
export class SortDirective {
  private sortOrder: string = 'asc';
  @Output()
  sort: EventEmitter<string> = new EventEmitter<string>();
  @HostListener('click') onClick() {
    this.sort.next(this.sortOrder);
    if (this.sortOrder === 'asc') this.sortOrder = 'desc';
    else if (this.sortOrder === 'desc') this.sortOrder = 'asc';
  }
}
