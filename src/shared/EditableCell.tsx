import React from 'react';

export const EditableCell = ({
  children,
  record,
  column,
  value,
  // dataIndex is removed from restProps so that it doesnt end up being in <td> - produces html warning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dataIndex,
  ...restProps
}: any) => {
  if (!record) {
    return <td {...restProps}>{children}</td>;
  }

  return <td {...restProps}>{column.renderRepresentation({ value, record })}</td>;
};
