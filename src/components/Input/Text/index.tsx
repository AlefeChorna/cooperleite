import React from 'react';

import InputBase, { InputProps } from '../Base';

const anyCharacterRegEx = /./;
const defaultMask = Array(100).fill(anyCharacterRegEx);

const MUInput: React.FC<InputProps> = (props) => {
  return <InputBase inputMask={defaultMask} {...props} />;
};

export default MUInput;
