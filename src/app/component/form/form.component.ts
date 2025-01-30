import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [FormsModule, JsonPipe],
  template: `
    <div class="form-container">
      <h1>ユーザー登録フォーム</h1>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)" class="form">
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
          <label class="form-field">性別</label>
          <select
            name="gender"
            [(ngModel)]="formData.gender"
            required
            class="form-input"
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select>
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
  formData = {
    name: '',
    email: '',
    age: null as number | null,
    gender: ''
  };

  showData = false;
  submitSuccess = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.showData = true;
      this.submitSuccess = true;
      console.log('フォームデータ:', this.formData);
    }
  }
}
