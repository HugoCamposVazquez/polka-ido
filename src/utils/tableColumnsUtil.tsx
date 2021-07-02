import React from 'react';

import binImage from '../assets/bin_image.svg';
import starEmpty from '../assets/star_empty.svg';
import startFill from '../assets/star_fill.svg';

export const getAllColumns = () => {
  return [
    {
      title: 'Project',
      dataIndex: 'title',
      width: '300px',
      renderRepresentation: (cellProps: any) => (
        // <NameRepresentation
        //     {...cellProps}
        //     value={cellProps.record!.fromEmployee.name}
        //     avatar={cellProps.record!.fromEmployee.avatar}
        //     cellStyle={getTaskDefaultStyle(cellProps.record!.status.name, taskStatuses)}
        // />
        <div style={{ display: 'flex' }}>
          <img
            style={{ height: '24px', width: '24px', objectFit: 'cover', marginRight: '12px' }}
            src={cellProps.record.iconUrl}
          />
          <div>{cellProps.record.title}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.status}</div>,
    },
    {
      title: 'Starts',
      dataIndex: 'starts',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.starts}</div>,
    },
    {
      title: 'Ends',
      dataIndex: 'ends',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.ends}</div>,
    },
    {
      title: 'Raise amount',
      dataIndex: 'raiseAmountTotal',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.raiseAmountTotal}</div>,
    },
    {
      title: 'Access',
      dataIndex: 'access',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.access}</div>,
    },
    {
      title: 'Token price',
      dataIndex: 'tokenPrice',
      width: '150px',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.tokenPrice}</div>,
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      width: '100px',
      renderRepresentation: (cellProps: any) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {cellProps.record.featured ? <img src={startFill} /> : <img src={starEmpty} />}
        </div>
      ),
    },
    {
      title: '',
      width: '80px',
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
