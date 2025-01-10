import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoonsListComponent } from './moons-list.component';

describe('MoonsListComponent', () => {
  let component: MoonsListComponent;
  let fixture: ComponentFixture<MoonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonsListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MoonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
