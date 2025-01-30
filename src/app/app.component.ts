import { Component } from '@angular/core';
import { FormComponent } from './component/form/form.component';

@Component({
  selector: 'app-root',
  imports: [FormComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'component-test';
}
