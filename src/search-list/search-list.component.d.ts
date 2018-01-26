import {EventEmitter, Renderer2} from '@angular/core';

export declare class SearchListComponent {
  go: EventEmitter<string>;
  titlesOfData: string[];
  autoComplete: boolean;
  maxSuggestions: number;
  goSearch(term: string);
  constructor(private renderer: Renderer2);
  fillSuggestions(term: string);
}
