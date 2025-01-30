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

      fireEvent.input(getByLabelText('名前'), { target: { value: `test${i}` } });
      fireEvent.input(getByLabelText('メールアドレス'), { target: { value: `test${i}@test.com` } });
      fireEvent.input(getByLabelText('年齢'), { target: { value: `${i}` } });
      fireEvent.input(getByLabelText('住所'), { target: { value: `test address${i}` } });
      fireEvent.click(getByRole('button'));

      expect(formSubmit).toHaveBeenCalledWith({
        name: `test${i}`,
        email: `test${i}@test.com`,
        age: i,
        address: `test address${i}`
      })
    });
  });
});
