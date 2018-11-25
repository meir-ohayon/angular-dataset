# Angular Dataset
angular-dataset enable displaying json data (from json file or json emitted from server api) with ease.

angular-dataset consist of one data service one directive and two components:
* Service to fetch the json data and filter it to match requirements of pagination or search results. Notice that this package does not offer table component with 'datasource' input (as it do offer search and pagination components), rather it offers the required data service while the table itself (if you wish it to be a table display) you need to build yourself with html (follow the [demos](#demo-links-plunker) to see how this concept works - you can see there that building the table view yourself rather than using some 'datatable' component does not entails much of codding and in the other hand have its advantages).<br>The advantages of this approach over the table component approach are:
  * You are not limited to table view, so you can do list view or some tree view (for hierarchical nature data) or some collapsed view - really any view form you wish to have. See the 5th demo listed on [demos](#demo-links-plunker) section that uses list view rather than table view.
  * You have moe control on formatting the display on specific fields - i.e. checkboxes for boolean values, formating of datetime fields, etc. (in the 5th and 6th demo I use checkboxes for boolean vakues).
  * You can add custom columns or rows - i.e. calculated column, coloumn with buttons actions (edit, delete, select etc.), grouping rows, calculated rows to summarize group ,etc.
* Pagination component to support pagination.
* Search component to support search with (optionally) auto complete.
* Support sort in table display through the Sortable Directive - the actual sorting you'll do yourself in the component code, but this directive handels the arrow display and also the sort order toggling (i.e. toggling ascending/descending order). See it in action in the 6th demo listed on [demos](#demo-links-plunker) section.  
All of that enables you to create very easily dataset (typically table) to display json data along with pagination and search (that includes auto complete by default).

## Table of Contents

- [Dependencies](#dependencies)
- [Installation](#installation)
  - [SystemJS](#systemjs)
- [Getting Started](#getting-started)
  - [Search component API](#search-component-api)
  - [Pagination component API](#pagination-component-api)
  - [Sortable directive API](#sortable-directive-api)
- [Demo Links (Plunker)](#demo-links-plunker)
- [Troubleshooting](#troubleshooting)
- [Have you found a bug or want to contribute?](#have-you-found-a-bug-or-want-to-contribute)

## Dependencies
* [Angular 6+](https://angular.io)
* [Bootstrap 4](https://www.getbootstrap.com)

## Installation
After installing the above dependencies, install \'angular-dataset\' via:
```shell
npm install --save angular-dataset
```
Once installed you need to import our main module:
```js
import { AngularDataset } from 'angular-dataset';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice `AngularDataset.forRoot()`):
```js
import { AngularDataset } from 'angular-dataset';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [AngularDataset.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import `AngularDataset`:

```js
import { AngularDataset } from 'angular-dataset';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [AngularDataset, ...], 
})
export class OtherModule {
}
```

### SystemJS
If you are for some reason still using SystemJS (rather than the recommended angular cli that goes with webpack), you should also adjust your configuration to map \'angular-dataset\' to its main module file.

In your systemjs config file, `map` needs to tell the System loader where to look for \'angular-dataset\':
```js
map: {
  ...
  'angular-dataset': 'node_modules/angular-dataset/index.js',
  ...
}
```

## Getting Started
I think the way to learn how to use angular-dataset is by jumping ahead to the [demos](#demo-links-plunker) since the code is fairly self explanatory.

### Search component API

#### Methods

| | | |
|-|-|-|
| go | go accepts function name in your component, that will accept as parameter $event object. In my plunker demos I implement this in the view this way:<br><search (go)="search($event)" ...></search><br>, and in the component code:<br>search(terms: string) {<br>...<br>}

#### Inputs

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
| titlesOfData | string[] | [] | Array of the 'title field' values. e.g. the field that we want to be searchable. You need to implement in your component ngOnInit event, some code similar to the code I did in the demos in order to fill this title values. |
| autoComplete | boolean | true | Whether to add the auto complete (if you want to turn off auto complete set it to false). |
| maxSuggestions | number | 10 | If autoComplete is true it set up the max number of suggestions to be displayed in the auto complete window. |

### Pagination component API

#### Methods

| | | |
|-|-|-|
| goTo | goTo accepts function name in your component, that will accept as parameter $event object. In my plunker demos I implement this in the view this way:<br><pagination (goTo)="goToPage($event)" …></ pagination ><br>, and in the component code:<br>goToPage(page: number) {<br>...<br> } |

#### Inputs

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
| total | number | 0 | The total number of the elements in the json. You need to implement in your component ngOnInit event, some code similar to the code I did in the demos in order to fill this total value. |
| page | number | | The page number that needs to be displayed upon first load. You need to set this value with number variable initialized in the component constructor and not with number directly – see code in demos. |
| numOfItemsForPage | number | | Number of items for page. You need to set this value with number variable initialized in the component and not with number directly – see code in demos. |
| prevNextLinks | boolean | true | Whether to display previous (<<) and next (>>) links. |
| firstLastLinks | boolean | false | Whether to display first (<<<<) and last (>>>>) links. |
| smallSize | boolean | false | Whether to apply the bootstrap css class pagination-sm that makes the links display smaller. |
| maxLinks | number | unlimited | How match pages links to display (range). |
| ellipses | boolean | true | In case you choose to limit the number of links to display to specified range, this setting determine whether to add ellipses before and after this range. |
| numOfAdditionalLinksBeforeAndAfterEllipses | number | 1 | In case you choose to limit the number of links to display to specified range and choose to use ellipses, this setting determine the number of additional links to display before and after the ellipses (to display the first one(s) and last one(s)). |
| linksStyles | json string | \' { \"color\": \"blue\" }\' | CSS settings for the links. |
| activeLinkStyles | json string | \'{ \"font-weight\": \"bolder\", \"color\": \"red\" }\' | CSS settings for the active link. |

### Sortable directive API

#### Methods

| | | |
|-|-|-|
| sort | sort accepts 4 arguments: <br>* The field name <br>* The field type - some key value that needs to corespond with the component sort code that you'll write for distinguishing the sort type that needs to be done (aka string sort / number sort / date sort) <br>* The $event object that it used for holding the current sort direction <br>* The coloumn index in the table display |

## Demo Links (Plunker)

| | | |
|-|-|-|
| [(1)](https://plnkr.co/edit/gtWODTK8BZjo2LCajLSC?p=preview)	| Usage with basic settings. |
| [(2)](https://plnkr.co/edit/KVEflJhInGRBMxii9IZK?p=preview)	| The same as (1) but with url pagination.<br>To examine this in the plunker, pop out the preview window of the plunker by clicking the blue 'X' button in the upper right corner,- only then you'll be able to see the url changes in the browser. |
| [(3)](https://plnkr.co/edit/z10GGGFRmtdxGK9xjmAz?p=preview)	| The same as (1) but with custom pagination settings. |
| [(4)](https://plnkr.co/edit/7xwaHLzLOP4Ql1Bwe49o?p=preview)	| The same as (2) but with custom pagination settings. |
| [(5)](https://plnkr.co/edit/aTSBFAQ4zycCRpAPQHAl?p=preview)	| This demo is for materializing the fact that Angular Dataset is not limited to table display,- rather you are the one that decides and build the display in any form you wish to have. In this specific demo the list view had been chosen. |
| [(6)](https://plnkr.co/edit/5Z9WJzzp8xBqKU3plGh4?p=preview)	| This demo demonstrates usage of Angular Dataset with sorting capabilities. Click on one of the table column headers (except the 'Completed' header) to sort by this column in ascending order - clicking again will toggle the sort order (to descending order in this case). |

## Troubleshooting
You can ask for support in the StackOverflow site (under the angular-dataset tag).

## Have you found a bug or want to contribute?
Please fill in issue, preferably reproducing the bug using http://plnkr.co (and include link to the plunker page in the issue). 

You are also invited to fix bugs or add capabilities. Please add a link, in the issue related page (or in new issue if you want to suggest new capability), to your plunker page that solves the issue, also specifying the locations of your code additions. You don't need to create plunker from scratch, you can fork one from of our demos.
