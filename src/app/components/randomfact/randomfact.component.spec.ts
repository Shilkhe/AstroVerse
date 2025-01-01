import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomfactComponent } from './randomfact.component';

describe('RandomfactComponent', () => {
  let component: RandomfactComponent;
  let fixture: ComponentFixture<RandomfactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomfactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomfactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
