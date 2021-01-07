import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDomainComponent } from './app-domain.component';

describe('AppDomainComponent', () => {
  let component: AppDomainComponent;
  let fixture: ComponentFixture<AppDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
