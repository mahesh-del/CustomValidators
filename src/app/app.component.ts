import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  inputForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.inputForm = fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      dropdown: ['true', Validators.required]
    }, {
      validators: this.customValidator()
    })
  }
  title = 'CustomValidators';

  customValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const dropdownValue = formGroup.get('dropdown')?.value;
      const lastName = formGroup.get('lastName')?.value;
      if (dropdownValue === 'true' && (!lastName || lastName.trim() === '')) {
        return { lastNameRequired: true }; 
      }
      return null;
    }
  }
  onSubmit() {
    console.log(this.inputForm.value)
  }

}
