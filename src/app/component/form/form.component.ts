import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [FormsModule, JsonPipe],
  styleUrl: "./form.component.css",
  template: `
    <div class="form-container">
      <h1>ユーザー登録フォーム</h1>

      <form #f="ngForm" (ngSubmit)="submitData(f)" class="form">
        @if (submitSuccess) {
          <div class="success-message">
            送信成功！
          </div>
        }

        <div>
          <label for="name" class="form-field">名前</label>
          <input
            id="name"
            name="name"
            [(ngModel)]="formData.name"
            required
            #name="ngModel"
            class="form-input"
          >
          @if (name.invalid && (name.dirty || name.touched)) {
            <small class="error-message">名前は必須です</small>
          }
        </div>

        <div>
          <label for="email" class="form-field">メールアドレス</label>
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
            <small class="error-message">有効なメールアドレスを入力してください</small>
          }
        </div>

        <div>
          <label for="age" class="form-field">年齢</label>
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
            <small class="error-message">有効な年齢を入力してください</small>
          }
        </div>

        <div>
          <label for="address" class="form-field">住所</label>
          <input
            id="address"
            name="address"
            [(ngModel)]="formData.address"
            required
            #address="ngModel"
            class="form-input"
          >
          @if (address.invalid && (address.dirty || address.touched)) {
            <small class="error-message">住所は必須です</small>
          }
        </div>

        <button
          type="submit"
          [disabled]="!f.valid"
          class="submit-button"
        >
          送信
        </button>

        @if (showData) {
          <div class="data-preview">
            <h3>送信データ:</h3>
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
    name: '',
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
