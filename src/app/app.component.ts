import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormRecord, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    blackListName = 'Test';
  createForm: FormGroup;

  constructor() {
    this.createForm = new FormGroup({
      'projectName': new FormControl(
        null,
        [Validators.required],
        [this.forbiddenNamesValidator()]
      ),
      'email': new FormControl(
        null,
        [Validators.required, Validators.email]
      ),
      'projectStatus': new FormControl('Stable', [Validators.required])
    });
  }

  forbiddenNamesValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const projectName = control.value;
      if (projectName === this.blackListName) {
        return of({ 'nameIsForbidden': true });
      } else {
        return of(null);
      }
    };
  }

  onSubmit() {
    if (this.createForm.valid) {
      console.warn(this.createForm.value);

    }
  }

}
