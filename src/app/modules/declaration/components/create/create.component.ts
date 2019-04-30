import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeclarationService } from '../../services/declaration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  file: File;

  constructor(private formBuilder: FormBuilder,
              private declarationService: DeclarationService,
              private router: Router) { }

  /**
   * @description Creates the form, used in the HTML
   * The form contains three fields, all with `required` Validators
   */
  ngOnInit() {
    this.createForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.required],
      costs: ['', Validators.required]
    });
  }

  /**
   * @return `file` control
   */
  get fileProp() {
    return this.createForm.get('file');
  }

  /**
   * @return `description` control
   */
  get description() {
    return this.createForm.get('description');
  }

  /**
   * @return `costs` control
   */
  get costs() {
    return this.createForm.get('costs');
  }

  /**
   * @description Called whenever a file upload happens
   * Stores the file in a local variable for later use
   */
  onFileChange(event) {
    this.file = event.target.files[0];
  }

  /**
   * @description Checks whether all createForm fields all valid.
   * In this case it is required that all fields all filled in.
   * If the backend returns an error, an error is displayed in the HTML
   *
   * Since an image is used in this form, the data will be send as formData
   */
  createDeclaration() {
    if (this.createForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('description', this.createForm.controls.description.value);
    formData.append('costs', this.createForm.controls.costs.value);

    this.declarationService.createDeclaration(formData)
      .subscribe(() => this.router.navigate(['declaration/dashboard']), console.error);
  }
}
