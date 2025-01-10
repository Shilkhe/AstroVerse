import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpacecraftsPageComponent } from './spacecrafts-page.component';

describe('SpacecraftsPageComponent', () => {
  let component: SpacecraftsPageComponent;
  let fixture: ComponentFixture<SpacecraftsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacecraftsPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpacecraftsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
