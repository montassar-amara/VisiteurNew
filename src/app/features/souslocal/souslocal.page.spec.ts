import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SouslocalPage } from './souslocal.page';

describe('SouslocalPage', () => {
  let component: SouslocalPage;
  let fixture: ComponentFixture<SouslocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SouslocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
