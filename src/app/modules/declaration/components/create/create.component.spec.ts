import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    expect(component.createForm.valid).toBeFalsy();
  });

  it('should test description field validity', () => {
    let errors = {};
    const description = component.createForm.controls['description'];

    errors = description.errors || {};
    expect(errors['required']).toBeTruthy();

    description.setValue('Test description');
    errors = description.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should test costs field validity', () => {
    let errors = {};
    const costs = component.createForm.controls['costs'];

    errors = costs.errors || {};
    expect(errors['required']).toBeTruthy();

    costs.setValue(12.2);
    errors = costs.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should change the file variable after a fileUpload', () => {
    const file = new File([], 'Mock File');
    expect(component.file).toBe(undefined);
    component.onFileChange({ target: { files: [file] } });
    expect(component.file).toBe(file);
  });
});
