import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [FormsModule, JsonPipe],
  styleUrl: "./form.component.css",
  template: `
    <div class="form-container">
      <form #f="ngForm" (ngSubmit)="submitData(f)" class="form">
        @if (submitSuccess) {
          <div class="success-message">
            Success!
          </div>
        }

        <div class="name">
          <div class="name-field">
            <label for="firstName" class="form-field">FirstName</label>
            <input
              id="firstName"
              name="firstName"
              [(ngModel)]="formData.firstName"
              required
              #firstName="ngModel"
              class="form-input"
            >
            @if (firstName.invalid && (firstName.dirty || firstName.touched)) {
              <small class="error-message">FirstName is required</small>
            }
          </div>
          <div class="name-field">
            <label for="lastName" class="form-field">LastName</label>
            <input
              id="lastName"
              name="lastName"
              [(ngModel)]="formData.lastName"
              required
              #lastName="ngModel"
              class="form-input"
            >
            @if (lastName.invalid && (lastName.dirty || lastName.touched)) {
              <small class="error-message">LastName is required</small>
            }
          </div>
        </div>

        <div>
          <label for="email" class="form-field">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="formData.email"
            required
            email
            #email="ngModel"
            class="form-input"
          >
          @if (email.invalid && (email.dirty || email.touched)) {
            <small class="error-message">Please enter a valid email</small>
          }
        </div>

        <div>
          <label for="age" class="form-field">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            [(ngModel)]="formData.age"
            required
            min="0"
            #age="ngModel"
            class="form-input"
          >
          @if (age.invalid && (age.dirty || age.touched)) {
            <small class="error-message">Please enter a valid age</small>
          }
        </div>

        <div>
          <label for="address" class="form-field">Address</label>
          <input
            id="address"
            name="address"
            [(ngModel)]="formData.address"
            required
            #address="ngModel"
            class="form-input"
          >
          @if (address.invalid && (address.dirty || address.touched)) {
            <small class="error-message">Address is required</small>
          }
        </div>

        <div class="submit-button-container">
          <button
            type="submit"
            [disabled]="!f.valid"
            class="submit-button"
          >
            Submit
          </button>
        </div>

        @if (showData) {
          <div class="data-preview">
            <h3>Form Data</h3>
            <pre>{{ formData | json }}</pre>
          </div>
        }
      </form>
    </div>
  `,
})
export class FormComponent {
  formSubmit = output<any>();
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    age: null as number | null,
    address: '',
  };

  showData = false;
  submitSuccess = false;

  submitData(form: any) {
    if (form.valid) {
      this.showData = true;
      this.submitSuccess = true;
    }
    this.formSubmit.emit(this.formData);
  }
}
