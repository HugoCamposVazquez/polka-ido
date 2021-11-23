import { format, fromUnixTime } from 'date-fns';
import React from 'react';

import starEmpty from '../assets/star_empty.svg';
import startFill from '../assets/star_fill.svg';
import { getIPFSResolvedLink } from './data';
import { formatTokenAmount } from './numModifiyngFuncs';

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
            src={cellProps.record.imageUrl ? getIPFSResolvedLink(cellProps.record.imageUrl) : ''}
          />
          <div>{cellProps.record.title ? cellProps.record.title : ''}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => {
        if (cellProps.record.startDate * 1000 > Date.now()) return <div>Upcoming</div>;
        if (cellProps.record.startDate * 1000 < Date.now() && cellProps.record.endDate * 1000 > Date.now())
          return <div>In Progress</div>;
        if (cellProps.record.endDate * 1000 < Date.now()) return <div>Ended</div>;
        return <div>N/A</div>;
      },
    },
    {
      title: 'Starts',
      dataIndex: 'starts',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => (
        <div>{format(fromUnixTime(cellProps.record.startDate), 'dd/MM/yy')}</div>
      ),
    },
    {
      title: 'Ends',
      dataIndex: 'ends',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{format(fromUnixTime(cellProps.record.endDate), 'dd/MM/yy')}</div>,
    },
    {
      title: 'Raise amount',
      dataIndex: 'cap',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{formatTokenAmount(cellProps.record.currentDepositAmount)}</div>,
    },
    {
      title: "Token's per MOVR",
      dataIndex: 'tokenPrice',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{formatTokenAmount(cellProps.record.salePrice)}</div>,
    },
    {
      title: 'Access',
      dataIndex: 'access',
      width: '9.375rem',
      renderRepresentation: (cellProps: any) => <div>{cellProps.record.whitelisted ? 'Whitelisted' : 'Public'}</div>,
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
  ];
};
