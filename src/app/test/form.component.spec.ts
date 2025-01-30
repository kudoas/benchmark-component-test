import { render, fireEvent } from '@testing-library/angular';

import { FormComponent } from '../component/form/form.component';

describe('FormComponent', () => {
  it('should create', async () => {
    const formSubmit = jasmine.createSpy('formSubmit');
    const { getByLabelText, getByRole, } = await render(FormComponent, {
      on: { formSubmit }
    });

    fireEvent.input(getByLabelText('名前'), { target: { value: 'test' } });
    fireEvent.input(getByLabelText('メールアドレス'), { target: { value: 'test@test.com' } });
    fireEvent.input(getByLabelText('年齢'), { target: { value: '20' } });
    fireEvent.input(getByLabelText('住所'), { target: { value: 'test address' } });
    fireEvent.click(getByRole('button'));

    expect(formSubmit).toHaveBeenCalledWith({
      name: 'test',
      email: 'test@test.com',
      age: 20,
      address: 'test address',
    })
  });
});
