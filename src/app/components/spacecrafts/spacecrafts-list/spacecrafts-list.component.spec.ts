import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpacecraftsListComponent } from './spacecrafts-list.component';

describe('SpacecraftsListComponent', () => {
  let component: SpacecraftsListComponent;
  let fixture: ComponentFixture<SpacecraftsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacecraftsListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpacecraftsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
