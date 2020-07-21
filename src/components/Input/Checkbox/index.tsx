import React, { useState, useEffect, useRef } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useField } from '@unform/core';

import Col from '../../Col';
import { MetrincsProps } from '../Base';

import { Checkbox as MUICheckbox } from './styles';

interface CheckboxProps extends MetrincsProps {
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  xs = 12,
  sm = 12,
  md = 12,
}) => {
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
    <Col xs={xs} sm={sm} md={md}>
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
    </Col>
  );
};

export default Checkbox;
