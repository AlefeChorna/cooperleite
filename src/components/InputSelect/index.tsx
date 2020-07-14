import React, { useState, useRef, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useField } from '@unform/core';

import { FormControl } from './styles';

interface Options {
  id: string | number;
  value: string | number;
}

interface InputSelectProps {
  label: string;
  name: string;
  options: Options[];
  defaultOptionText?: string;
  helperText?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  name,
  options,
  defaultOptionText = 'Selecione uma opção',
  helperText = 'Campo Obrigatório',
}) => {
  const [state, setState] = React.useState<number | string>('');
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: () => state,
      setValue: (_, newValue) => {
        setState(newValue || 'none');
      },
    });
  }, [fieldName, registerField, state]);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    setState(String(event.target.value));
  };

  return (
    <FormControl variant="outlined">
      <InputLabel error={!!error}>{label}</InputLabel>
      <Select
        ref={inputRef}
        native
        label={label}
        name={name}
        value={state}
        inputProps={{
          ref: inputRef,
          defaultValue,
        }}
        onChange={handleChange}
        error={!!error}
      >
        {!!helperText && <option value="none">{defaultOptionText}</option>}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </Select>
      <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
    </FormControl>
  );
};

export default InputSelect;
