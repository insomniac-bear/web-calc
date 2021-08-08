// Components
import { Table } from './Table';
import { TableBody } from './Table-body';
import { TableHeader } from './Table-header';

export const DepatrmentList = ({ departments }) => {
  const headerTitles = {
    firstColumn: 'Department Name',
    secondColumn: 'Author',
    thirdColumn: 'Created Date',
    fourthColumn: 'Updated Date',
  };

  return(
    <Table>
      <TableHeader headerTitles={headerTitles} />
      <TableBody tableData={departments} />
    </Table>
  );
};