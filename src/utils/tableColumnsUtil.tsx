import { format } from 'date-fns';
import React from 'react';

import binImage from '../assets/bin_image.svg';
import starEmpty from '../assets/star_empty.svg';
import startFill from '../assets/star_fill.svg';

export const getAllColumns = () => {
  return [
    {
      title: 'Project',
      dataIndex: 'title',
      width: '18.75rem',
      renderRepresentation: (cellProps: any) => (
        // <NameRepresentation
        //     {...cellProps}
        //     value={cellProps.record!.fromEmployee.name}
        //     avatar={cellProps.record!.fromEmployee.avatar}
        //     cellStyle={getTaskDefaultStyle(cellProps.record!.status.name, taskStatuses)}
        // />
        <div style={{ display: 'flex' }}>
          <img
            style={{ height: '1.5rem', width: '1.5rem', objectFit: 'cover', marginRight: '0.75rem' }}
            src={cellProps.record.imageUrl}
          />
          <div>{cellProps.record.title}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.status}</div>,
    },
    {
      title: 'Starts',
      dataIndex: 'starts',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{format(cellProps.record.starts, 'dd/MM/yy')}</div>,
    },
    {
      title: 'Ends',
      dataIndex: 'ends',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{format(cellProps.record.ends, 'dd/MM/yy')}</div>,
    },
    {
      title: 'Raise amount',
      dataIndex: 'raiseAmountTotal',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.raiseAmountTotal}</div>,
    },
    {
      title: 'Access',
      dataIndex: 'access',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.access}</div>,
    },
    {
      title: 'Token price',
      dataIndex: 'tokenPrice',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.tokenPrice}</div>,
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      width: '6.25rem',
      renderRepresentation: (cellProps: any) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {cellProps.record.featured ? <img src={startFill} /> : <img src={starEmpty} />}
        </div>
      ),
    },
    {
      title: '',
      width: '5rem',
      renderRepresentation: () => (
        <div
          style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
          onClick={() => {
            console.log('deleted!');
          }}>
          {<img src={binImage} />}
        </div>
      ),
    },
  ];
};
