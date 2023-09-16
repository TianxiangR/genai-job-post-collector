import { Checkbox, Link, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { Dispatch, SetStateAction, useMemo } from 'react';

import { AugmentedJobInfo, JobInfo } from '../../types';
import JobTableHead from './JobTableHead';
import EnhancedTableToolbar from './ToolBar';
import { Order, SortId } from './types';

export interface JobTableProps {
  jobList: JobInfo[];
  augmentedJobList: AugmentedJobInfo[];
  setJobList: Dispatch<SetStateAction<JobInfo[]>>;
}

/**
 * 
 * @returns 
 */
const JobTable = (props: JobTableProps) => {
  const { jobList, setJobList, augmentedJobList } = props;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<SortId>('id');
  const [selected, setSelected] = React.useState<number[]>([]);
  const sortedList = useMemo(() => {
    const sorted = [...augmentedJobList].sort((a, b) => {
      if (a[orderBy] > b[orderBy]) return 1;
      if (a[orderBy] < b[orderBy]) return -1;
      return 0;
    });

    return order === 'asc' ? sorted: sorted.reverse();
  }, [orderBy, order, augmentedJobList]);

  /**
   * 
   * @param event 
   * @param property 
   */
  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: SortId,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /**
   * 
   * @param event 
   * @returns 
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = jobList.map((_, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /**
   * create a select handler function by index
   * @param index
   * @returns 
   */
  const createHandleSelectByIndex = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = [...selected, index];
      setSelected(newSelected);
      return;
    }

    const newSelected = selected.filter((value) => value !== index);
    setSelected(newSelected);
  };

  /**
   * 
   * @param id 
   * @returns 
   */
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  /**
   * delete all the selected rows
   */
  const handleDelete = () => {
    const updatedList = jobList.filter((_, index) => {
      // keep the unselected
      return !isSelected(index);
    });

    setJobList(updatedList);
    setSelected([]);
  };


  return (
    <TableContainer sx={{maxHeight: '350px'}}>
      <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete}/>
      <Table size='medium'>
        <JobTableHead 
          numSelected={selected.length} 
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick} 
          order={order} 
          orderBy={orderBy}
          rowCount={jobList.length} />
      
        <TableBody>
          { sortedList.map((jobInfo, index) => {
            const isItemSelected = isSelected(index);
            const selectHandler = createHandleSelectByIndex(index);
            return <TableRow
              role="checkbox"
              tabIndex={-1}
              key={index}
              selected={isItemSelected}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onChange={selectHandler}
                />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                padding="none"
              >
                {jobInfo.id}
              </TableCell>
              <TableCell align="right" sx={{whiteSpace: 'nowrap'}}>{jobInfo.jobTitle}</TableCell>
              <TableCell align="right" sx={{whiteSpace: 'nowrap'}}>{jobInfo.companyName}</TableCell>
              <TableCell align="right" sx={{whiteSpace: 'nowrap'}}>{jobInfo.companyLocation}</TableCell>
              <TableCell align="right">
                <Link href={jobInfo.url} target="_blank">
                  Link
                </Link>
              </TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable;