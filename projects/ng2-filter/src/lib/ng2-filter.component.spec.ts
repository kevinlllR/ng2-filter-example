import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2FilterSearchComponent } from './ng2-filter.component';

describe('Ng2FilterSearchComponent', () => {
  let component: Ng2FilterSearchComponent;
  let fixture: ComponentFixture<Ng2FilterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2FilterSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2FilterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
