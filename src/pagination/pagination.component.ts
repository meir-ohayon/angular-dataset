import { Component, EventEmitter, Output, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'pagination',
  styles: [
    "li a { cursor: pointer; }"
  ],
  template: `
  <ul *ngIf="totalPages() > 1" class="pagination" [class.pagination-sm]="smallSize">
    <li class="page-item" *ngIf="page != 1 && firstLastLinks">
       <a class="page-link" (click)="pageClicked(1)">
        <span aria-hidden="true">««</span>
        <span class="sr-only">First</span>
       </a>
    </li>
    <li class="page-item" *ngIf="page != 1 && prevNextLinks">
      <a class="page-link" (click)="pageClicked(prevPage())">
        <span aria-hidden="true">«</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <ng-container *ngIf="ellipses && needsLeftEllipses && numOfAdditionalLinksBeforeAndAfterEllipses != 0">
      <li *ngFor="let p of leftEllipsesPrefixLinksRange()">
          <a class="page-link" (click)="pageClicked(p)" [ngStyle]="linksStyleObj">
            {{ p }}
          </a>
      </li>
    </ng-container>
    <li *ngIf="ellipses && needsLeftEllipses">
      <span class="page-link">...</span>
    </li>
    <li class="page-item" *ngFor="let p of pagesRange()">
        <a class="page-link" (click)="pageClicked(p)" [ngStyle]="p==page ? activeLinkStyleObj : linksStyleObj">
          {{ p }}
        </a>  
    </li>
    <li *ngIf="ellipses && needsRightEllipses">
      <span class="page-link">...</span>
    </li>
    <ng-container *ngIf="ellipses && needsRightEllipses && numOfAdditionalLinksBeforeAndAfterEllipses != 0">
      <li *ngFor="let p of rightEllipsesSuffixLinksRange()">
          <a class="page-link" (click)="pageClicked(p)" [ngStyle]="linksStyleObj">
            {{ p }}
          </a>
      </li>
    </ng-container>  
    <li class="page-item" *ngIf="prevNextLinks && totalPages() > page">
      <a class="page-link" (click)="pageClicked(nextPage())">
        <span aria-hidden="true">»</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
    <li class="page-item" *ngIf="totalPages() > page && firstLastLinks">
      <a class="page-link" (click)="pageClicked(totalPages())">
        <span aria-hidden="true">»»</span>
        <span class="sr-only">Last</span>
      </a>
    </li>  
  </ul>
  `
})
export class PaginationComponent implements AfterViewChecked {

  constructor(private cdRef:ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.activeLinkStyleObj = JSON.parse(JSON.stringify(this.activeLinkStyles));
    this.linksStyleObj = JSON.parse(JSON.stringify(this.linksStyles));
    this.cdRef.detectChanges();
  }
  
  @Input()
  total: number = 0;

  @Input()
  page: number = 1;

  @Input()
  numOfItemsForPage: number = 10;

  @Input()
  firstLastLinks: boolean = false;

  @Input()
  prevNextLinks: boolean = true;

  @Input()
  smallSize: boolean = false;

  @Input()
  maxLinks: number = this.totalPages();

  @Input()
  activeLinkStyles: {} = { "font-weight": "bolder", "color": "red" };

  @Input()
  linksStyles: {} = { "color": "blue" };

  @Input()
  ellipses: boolean = true;

  @Input()
  numOfAdditionalLinksBeforeAndAfterEllipses: number = 1;

  @Output()
  goTo: EventEmitter<number> = new EventEmitter<number>();

  activeLinkStyleObj: {};
  linksStyleObj: {};

  totalPages() {
    return Math.ceil(this.total / this.numOfItemsForPage);
  }

  startSlot: number;
  endSlot: number;
  needsLeftEllipses: boolean = false;
  needsRightEllipses: boolean = false;
  
  pagesRange(): number[] {
    let totPages: number = this.totalPages();
    if (this.maxLinks === 0) this.maxLinks = totPages;
    if (this.page > this.maxLinks) {
      this.needsLeftEllipses = true;
      if ((totPages - this.page) < this.maxLinks) {
        this.startSlot = totPages - this.maxLinks + 1;
      } else {
        this.startSlot = this.page;
      }
    } else {
      this.startSlot = 1;
      this.needsLeftEllipses = false;
    }
    this.endSlot = this.startSlot + this.maxLinks - 1;
    
    if (this.endSlot < totPages) {
      this.needsRightEllipses = true;
    } else {
      this.needsRightEllipses = false;
    }
    
    let ret: number[] = [];
    let i: number;
    for (i = this.startSlot; i <= this.endSlot; i++) {
      ret.push(i);
    }
    return ret;
  }

  rightEllipsesSuffixLinksRange(): number[] {
    let ret: number[] = [];
    let i: number;
    let totPages: number = this.totalPages();
    for (i = totPages - (this.numOfAdditionalLinksBeforeAndAfterEllipses -1); i <= totPages; i++) {
      if (this.pagesRange().indexOf(i) === -1) ret.push(i);
    }
    return ret;
  }

  leftEllipsesPrefixLinksRange(): number[] {
    let ret: number[] = [];
    let i: number;
    for (i = 1; i <= this.numOfAdditionalLinksBeforeAndAfterEllipses; i++) {
      ret.push(i);
    }
    return ret;
  }

  prevPage() {
    return Math.max(1, this.page - 1);
  }

  nextPage() {
    return Math.min(this.totalPages(), this.page + 1);
  }

  pageClicked(page: number) {
    this.goTo.next(page);
  }
}
