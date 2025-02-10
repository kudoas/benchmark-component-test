import { render, fireEvent } from '@testing-library/angular';

import { FormComponent } from '../../component/form/form.component';

const TEST_COUNT = 1000
const array = Array.from({ length: TEST_COUNT }, (_, i) => ({ index: i + 1 }));

describe('FormComponent', () => {
  array.forEach((_, i) => {
    it(`form test part ${i}`, async () => {
      const formSubmit = jest.fn();
      const { getByLabelText, getByRole } = await render(FormComponent, {
        on: { formSubmit }
      });

      fireEvent.input(getByLabelText('FirstName'), { target: { value: `first${i}` } });
      fireEvent.input(getByLabelText('LastName'), { target: { value: `last${i}` } });
      fireEvent.input(getByLabelText('Email'), { target: { value: `test${i}@test.com` } });
      fireEvent.input(getByLabelText('Age'), { target: { value: `${i}` } });
      fireEvent.input(getByLabelText('Address'), { target: { value: `test address${i}` } });
      fireEvent.click(getByRole('button'));

      expect(formSubmit).toHaveBeenCalledWith({
        firstName: `first${i}`,
        lastName: `last${i}`,
        email: `test${i}@test.com`,
        age: i,
        address: `test address${i}`
      })
    });
  });
});
