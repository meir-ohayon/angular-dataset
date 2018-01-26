# Angular Dataset
angular-dataset enable displaying json data (from json file or json emitted from server api) with ease.

angular-dataset consist of three components:
* Service to fetch the json data and filter it to match requirements of pagination or search results.
* Pagination component to support pagination.
* Search component to support search with (optionally) auto complete.
All of that enables you to create very easily dataset (typically table) to display json data along with pagination and search (that includes auto complete by default).

## Table of Contents

- [Dependencies](#dependencies)
- [Installation](#installation)
  - [SystemJS](#systemjs)
- [Getting Started](#getting-started)
  - [Search component API](#search-component-api)
  - [Pagination component API](#pagination-component-api)
- [Demo Links (Plunker)](#demo-links-plunker)
- [Troubleshooting](#troubleshooting)
- [Have you found a bug or want to contribute?](#have-you-found-a-bug-or-want-to-contribute)

## Dependencies
* [Angular 4+](https://angular.io)
* [Bootstrap 4](https://www.getbootstrap.com)

## Installation
After installing the above dependencies, install \'angular-dataset\' via:
```shell
npm install --save angular-dataset
```
Once installed you need to import our main module:
```js
import { AngularDataset } from \'angular-dataset\';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice `AngularDataset.forRoot()`):
```js
import { AngularDataset } from \'angular-dataset\';

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
import { AngularDataset } from \'angular-dataset\';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [AngularDataset, ...], 
})
export class OtherModule {
}
```

### SystemJS
If you are using SystemJS, you should also adjust your configuration to map \'angular-dataset\' to its main module file.

In your systemjs config file, `map` needs to tell the System loader where to look for \'angular-dataset\':
```js
map: {
  ...
  \'angular-dataset\': \'node_modules/angular-dataset/index.js\',
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

## Demo Links (Plunker)

| | | |
|-|-|-|
| [( 1 )](https://plnkr.co/edit/TvZuY3tCJSmWcFG8p9eQ?p=preview)	| Usage with basic settings. |
| [( 2 )](https://plnkr.co/edit/tRf5TEM0mc9f1lAbaMhD?p=preview)	| The same as (1) but with url pagination.<br>To examine this in the plunker, pop out the preview window of the plunker by clicking the blue 'X' button in the upper right corner,- only then you'll be able to see the url changes in the browser. |
| [( 3 )](https://plnkr.co/edit/IMzFgUBAjBTPYWUxppSX?p=preview)	| The same as (1) but with custom pagination settings. |
| [( 4 )](https://plnkr.co/edit/JZPwQYMa5TNZE94ESBv3?p=preview)	| The same as (2) but with custom pagination settings. |

## Troubleshooting
You can ask for support in the StackOverflow site (under the angular-dataset tag).

## Have you found a bug or want to contribute?
Please fill in issue, preferably reproducing the bug using http://plnkr.co (and include link to the plunker page in the issue). 

You are also invited to fix bugs or add capabilities. Please add a link, in the issue related page (or in new issue if you want to suggest new capability), to your plunker page that solves the issue, also specifying the locations of your code additions. You don't need to create plunker from scratch, you can fork one from of our demos.
