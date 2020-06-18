import React, { memo } from 'react';

import { Tr, Row, Text } from './styles';

interface NoDataRowProps {
  loading: boolean;
  colSpan: number;
}

const NoDataRow: React.FC<NoDataRowProps> = ({ loading, colSpan }) => (
  <Tr>
    <td colSpan={colSpan}>
      {!loading && (
        <Row>
          <Text>Nenhuma informação encontrada</Text>
        </Row>
      )}
    </td>
  </Tr>
);

export default memo(NoDataRow);
