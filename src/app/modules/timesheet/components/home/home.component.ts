import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hourLoggingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.hourLoggingForm = this.formBuilder.group({
      type: ['', Validators.required],
      project: ['', Validators.required],
      hours: ['', Validators.required],
      date: ['', Validators.required],
      kilometers: ['', Validators.required]
    })
  }

  get type(): AbstractControl {
    return this.hourLoggingForm.get('type');
  }

  get project(): AbstractControl {
    return this.hourLoggingForm.get('project');
  }

  get hours(): AbstractControl {
    return this.hourLoggingForm.get('hours');
  }

  get date(): AbstractControl {
    return this.hourLoggingForm.get('date');
  }

  get kilometers(): AbstractControl {
    return this.hourLoggingForm.get('kilometers');
  }

  addHours(): void {
    if (this.hourLoggingForm.invalid) {
      return;
    }
  }
}
