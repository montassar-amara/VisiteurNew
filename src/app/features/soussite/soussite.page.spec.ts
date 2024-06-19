import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoussitePage } from './soussite.page';

describe('SoussitePage', () => {
  let component: SoussitePage;
  let fixture: ComponentFixture<SoussitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SoussitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
