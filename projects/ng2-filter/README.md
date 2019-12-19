# Example
https://stackblitz.com/edit/ng2-filter
# Explain
This component is used to manage the filters
The use cases range from putting together:
* The queries for rest, or any webservice.
* Group asynchronous actions, etc.
# Installation

`npm install -S ng2-filter`
`yarn add ng2-filter`

# Usage
1.-Import the Component
```
import {Ng2FilterComponent} from 'ng2-filter';
......

@NgModule({
    .....
    .....
    declarations: [AppComponent,Ng2FilterComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```
2.-app.component.html
```
<ng2-filter 
[template]="tpl" 
 [filters]="filters" 
 [hook]="hook" 
 (out)="out($event)"
 (raw)="raw($event)">
</ng2-filter>
```
#### Template
It is the default template for the component.
##### Example

```
<ng-template #tpl>
	<form (onSubmit)="submit()">
		<mat-form-field>
			<mat-label>Term</mat-label>
			<input matInput type="text" [formControl]="term" />
		</mat-form-field>
		<button type="submit" (click)="submit()">Search</button>
	</form>
</ng-template>
```
#### filters
They are the filters that the component will process and emit an observable with the total result of the filters sent.
the types of data supported are
FormGroup, FormControl, Observable
```
type filter = FormGroup | FormControl | Observable<any>
```
in case of being a formgrup or formcontrol, the component takes the observable valuechanges.
Example
```
<ng-container #flt2>
	<form [formGroup]="filterFormB">
		<div class="filter">
			<h3>Filters</h3>
			<mat-form-field>
				<mat-label>Age</mat-label>
				<input matInput formControlName="age">
			</mat-form-field>
			<mat-form-field>
				<mat-label>Address</mat-label>
				<input matInput formControlName="address">
			</mat-form-field>
		</div>

		<div formGroupName="select">
			<h3>Selects</h3>
			<mat-checkbox formControlName="name">Name </mat-checkbox>
			<mat-checkbox formControlName="lastName"> LastName </mat-checkbox>
		</div>
		<div formGroupName="sort">
			<h3>Sort</h3>
			<h5>ItemB</h5>
			<mat-radio-group formControlName="itemB">
				<mat-radio-button value='1'> ASC </mat-radio-button>
				<mat-radio-button value="-1"> DEC </mat-radio-button>
			</mat-radio-group>
		</div>

	</form>
</ng-container>
```
You can add filters asynchronously, just make sure that the returned object is immutable.
Custom form valuechange
```
    const temp = this.filterFormA.valueChanges.pipe(
    filter....
    debounceTime...
    etc...
      switchMap(item => {
        return of(item);
      })
    );
    setTimeout(()=>{
        this.filters=[...filters,temp]
      },4000)
    }
```
#### Hook (optional)
The hook is the trigger to process all filters, internally the filters are grouped in a withLatestFrom, so they must issue at least one value to be processed as a group.

The hook can be changed dynamically or assigned synchronously, just make sure it is immutable.

Example Submit hook
``` 
// app.component.html
.....
.....
<button type="submit" (click)="submit()">Search</button>
.....
.....
// app.component.ts
submit() {
    this.hook.next(true);
    // setTimeou(()=>{this.hook.next(true)},3000);
}
```
### Result
The component supports the raw and out event.
```
  out(obs: Observable<any>) {
    obs.subscribe((item) => {
      console.log("Observable", item);
    })
  }
```
The order of the output is equal to the order of the filters introduced.
```
  raw(item) {
    const filters = Object.assign({}, ...item.slice(2));
    console.log(filters);
    const obj = qs.stringify(filters);
    //age=ds&address=&select%5Bname%5D=&select%5BlastName%5D=true&sort%5BitemA%5D=&sort%5BitemB%5D=-1
    console.log(obj)
  }
```
## License

[MIT](https://tldrlegal.com/license/mit-license) © [kevinlllr](https://github.com/kevinlllr/ng2-filter-example)
