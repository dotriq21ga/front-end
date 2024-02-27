import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateChannelComponent } from './form-create-channel.component';

describe('FormCreateChannelComponent', () => {
  let component: FormCreateChannelComponent;
  let fixture: ComponentFixture<FormCreateChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
