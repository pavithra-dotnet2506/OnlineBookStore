import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Herobanner } from './herobanner';

describe('Herobanner', () => {
  let component: Herobanner;
  let fixture: ComponentFixture<Herobanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Herobanner],
    }).compileComponents();

    fixture = TestBed.createComponent(Herobanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
