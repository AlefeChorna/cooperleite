import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

import { FormControl } from './styles';

const InputSelect: React.FC = () => {
  const [state, setState] = React.useState<number | string>('');

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    setState(String(event.target.value));
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
      <Select
        native
        value={state}
        onChange={handleChange}
        label="Age"
        inputProps={{
          id: 'outlined-age-native-simple',
          name: 'age',
        }}
      >
        <option value="s">Selecione uma opção</option>
        <option value="10">Ten</option>
        <option value="20">Twenty</option>
        <option value="30">Thirty</option>
      </Select>
      <FormHelperText>Campo Obrigatório</FormHelperText>
    </FormControl>
  );
};

export default InputSelect;
