import React from 'react';

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha com um email válido.',
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const validate = (value) => {
    // nao valida o campo, se for false
    if (type === false) return true;

    if (value.length === 0) {
      setError('Preencha um valor.');

      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);

      return false;
    } else {
      setError(null);

      return true;
    }
  };

  const onChange = ({ target }) => {
    if (error) validate(target.value);

    setValue(target.value);
  };

  return {
    value,
    error,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
