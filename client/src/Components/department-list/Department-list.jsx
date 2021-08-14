// Components
import { Table } from '../table/Table';
import { DepartmentTableBody } from '../department-table-body/Department-table-body';
import { TableHeader } from '../table-header/Table-header';

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
      <DepartmentTableBody tableData={departments} />
    </Table>
  );
};