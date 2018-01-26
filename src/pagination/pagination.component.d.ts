import { EventEmitter } from '@angular/core';

export declare class PaginationComponent {
  total: number;
  page: number;
  numOfItemsForPage: number;
  firstLastLinks: boolean;
  prevNextLinks: boolean;
  smallSize: boolean;
  maxLinks: number;
  activeLinkStyles: {};
  linksStyles: {};
  ellipses: boolean;
  numOfAdditionalLinksBeforeAndAfterEllipses: number;
  goTo: EventEmitter<number>;
}
