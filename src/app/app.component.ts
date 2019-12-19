import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as qs from 'qs';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  filters: any = null;
  term: FormControl;
  hook: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  hook$: Observable<any> = this.hook.asObservable();
  filterFormA: FormGroup;
  filterFormB: FormGroup;
  constructor(private userService: UserService) {
    this.term = new FormControl('');

    this.filterFormA = new FormGroup({
      date_create: new FormGroup({
        gt: new FormControl(''),
        lt: new FormControl('')
      }),
      itemC: new FormControl(""),
      itemD: new FormControl(false)
    });
    this.filterFormB = new FormGroup({
      age: new FormControl(),
      address: new FormControl(),
      select: new FormGroup({
        name: new FormControl(''),
        lastName: new FormControl('')
      }),
      sort: new FormGroup({
        itemA: new FormControl(""),
        itemB: new FormControl(false)
      })
    });

    this.filters = [this.term];
    const query = "?id[gt]=5"
    this.userService.getByQuery(query).subscribe((data) => {
      console.log("Data user service", data)
    })


    const temp = this.filterFormA.valueChanges.pipe(
      switchMap(item => {
        return of(item);
      })
    );
    setTimeout(()=>{
      console.log("change hook");
     this.filters=[...this.filters,temp,this.filterFormB]
    },5000) 

  }
  ngOnInit() {

  }

  out(obs: Observable<any>) {
    obs.subscribe((item) => {
      console.log("Observable", item);
    })
  }

  raw(item) {
    const filters = Object.assign({}, ...item.slice(2));
    console.log(filters);
    const obj = qs.stringify(filters);
    console.log("Obj", obj)
  }
  submit() {
    this.hook.next(true);
  }

}
