import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStartComponent } from './review-start.component';

describe('ReviewStartComponent', () => {
  let component: ReviewStartComponent;
  let fixture: ComponentFixture<ReviewStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
