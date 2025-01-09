import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonsPageComponent } from './moons-page.component';

describe('MoonsPageComponent', () => {
  let component: MoonsPageComponent;
  let fixture: ComponentFixture<MoonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
