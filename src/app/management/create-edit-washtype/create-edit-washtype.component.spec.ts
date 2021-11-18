import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWashtypeComponent } from './create-edit-washtype.component';

describe('CreateEditWashtypeComponent', () => {
  let component: CreateEditWashtypeComponent;
  let fixture: ComponentFixture<CreateEditWashtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditWashtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditWashtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
