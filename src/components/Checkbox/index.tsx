import React, { useState, useEffect, useRef } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useField } from '@unform/core';

import { Checkbox as MUICheckbox } from './styles';

interface CheckboxProps {
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  const { fieldName, defaultValue, registerField } = useField(name);
  const [state, setState] = useState(!!defaultValue);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: () => {
        return state;
      },
      setValue: (_, newValue) => {
        setState(!!newValue);
      },
    });
  }, [fieldName, registerField, state, setState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState(event.target.checked);
  };

  return (
    <FormControlLabel
      style={{ color: '#ccc' }}
      label={label}
      control={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <MUICheckbox
          color="primary"
          style={!state ? { color: '#777' } : {}}
          inputRef={inputRef}
          checked={state}
          onChange={handleChange}
          inputProps={{
            name,
          }}
        />
      }
    />
  );
};

export default Checkbox;
