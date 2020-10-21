import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';

export const formatErrors = (errors) => _reduce(errors, (memo, value, key) => ({
  ...memo,
  [key]: _uniq(value).join(', '),
}), {});

export const userRules = {
  firstName: [{ required: true, message: 'First name is required', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    {
      min: 6, max: 50, message: 'Password must be 6-50 characters', trigger: 'blur',
    },
  ],
};
