import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsListComponent } from './facts-list.component';

describe('FactsListComponent', () => {
  let component: FactsListComponent;
  let fixture: ComponentFixture<FactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
