import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, withLatestFrom } from 'rxjs/operators';

type Filter = FormGroup | Observable<any | FormControl>;

@Component({
  selector: "ng2-filter",
  template: `
    <ng-template #base>
      Add a template!
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,

  styles: []
})
export class Ng2FilterComponent  {
  @ViewChild("base", { static: true }) base: TemplateRef<any>;

  @Input() filters: Array<Filter> = null;
  @Input() set hook(hook: Filter) {
    if (hook && !this.outValue) {
      this._hook = hook;
      this.initFlag();
    }
  }
  @Input() set template(tpl: TemplateRef<any>) {
    if (tpl) {
      this.viewContainer.createEmbeddedView(tpl);
    } else {
      this.viewContainer.clear();
    }
  }
  @Output() raw = new EventEmitter<any>();
  @Output() out = new EventEmitter<any>();
  get hook() {
    return this._hook;
  }
  _hook: Filter = null;
  outValue: Observable<any> = null;
  temp: Observable<any>;
  _tpl: TemplateRef<any>;


  constructor(
    private element: ElementRef,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnChanges(changes) {
    if (!this.hook) {
      if (changes.filters) {
        this.initNoFlag();
      }
    }
    else if (this.hook) {
      if (changes.filters) {
        this.initFlag();
      }
    }
  }

  initFilters() {
    let filters: Array<Filter> = null;
    if (this.filters && this.filters.length > 0) {
      filters = this.filters.map(item => {
        if ((item as any).valueChanges) {
          return (item as any).valueChanges.pipe(
            switchMap(it => {
              return of(it);
            })
          );
        } return item;
      });
      return filters;
    } else {
      throw new Error("Bad filter")
    }
  }
  initFlag() {
    console.warn("init Flag");

    const hook: any = (this.hook as any).valueChanges || this.hook;
    const filters: any = this.initFilters();
    const temp = withLatestFrom(...(filters as any))

    this.outValue = hook.pipe(
      debounceTime(1000),
      temp,
      distinctUntilChanged((a, b) => {
        const result = JSON.stringify(a) === JSON.stringify(b);
        return result;
      })
    );

    this.processOutput();

  }

  initNoFlag() {
    console.warn("this init No Flag");

    let filters: any = this.initFilters();
    this.outValue = combineLatest(...filters).pipe(
      distinctUntilChanged((a, b) => {
        const result = JSON.stringify(a) === JSON.stringify(b);
        return result;
      })
    );
    this.processOutput();
  }


  processOutput() {

    this.outValue.subscribe((data) => {
      this.raw.emit(data);
    });
    this.out.emit(this.outValue);
  }

  ngOnInit() {
    if (!this.outValue) {
      this.initNoFlag();
    }
  }
}
