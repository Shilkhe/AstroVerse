import {ComponentFixture,TestBed} from '@angular/core/testing';
import {PlanetPageComponent} from './planets-page.component';

describe('PlanetsPageComponent',()=>{
  let component:PlanetPageComponent;
  let fixture:ComponentFixture<PlanetPageComponent>;

  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports:[PlanetPageComponent]
    })
    .compileComponents();

    fixture=TestBed.createComponent(PlanetPageComponent);
    component=fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',()=>{
    expect(component).toBeTruthy();
  });
});
