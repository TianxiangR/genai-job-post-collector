import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React from 'react';

import { HeadCellSpec, Order, SortId } from './types';

const headCellSpecs: readonly HeadCellSpec[] = [
  {
    id: 'id',
    label: 'ID',
    sortable: true
  },
  {
    id: 'jobTitle',
    label: 'Job Title',
    sortable: true
  },
  {
    id: 'companyName',
    label: 'Company',
    sortable: true
  },
  {
    id: 'companyLocation',
    label: 'Location',
    sortable: true
  },
  {
    id: 'url',
    label: 'Url',
    sortable: false
  }
];

export interface JobTableHeaderProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: SortId) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: SortId;
  rowCount: number;
}

/**
 * 
 * @param props 
 * @returns 
 */
const JobTableHeader = (props: JobTableHeaderProps) => {
  const { orderBy, onRequestSort, onSelectAllClick, numSelected, rowCount, order } = props;
  const createSortHandler =
    (property: SortId) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCellSpecs.map((spec, index) => {
          const sortable = <TableCell 
            key={spec.id}
            align={index === 0 ? 'left' : 'right'}
            padding={index === 0 ? 'none' : 'normal'}
            sortDirection={orderBy === spec.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === spec.id}
              direction={orderBy === spec.id ? order: 'asc'}
              onClick={createSortHandler(spec.id)}
            >
              {spec.label}
            </TableSortLabel>
          </TableCell>;

          const nonSortable = <TableCell 
            key={spec.id}
            align={index === 0 ? 'left' : 'right'}
            padding={index === 0 ? 'none' : 'normal'}
            sortDirection={orderBy === spec.id ? order : false}
          >
            {spec.label}
          </TableCell>;
          return spec.sortable ? sortable : nonSortable;
        })}
      </TableRow>
    </TableHead>
  );
};

export default JobTableHeader;