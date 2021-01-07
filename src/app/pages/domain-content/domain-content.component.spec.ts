import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainContentComponent } from './domain-content.component';

describe('DomainContentComponent', () => {
  let component: DomainContentComponent;
  let fixture: ComponentFixture<DomainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
