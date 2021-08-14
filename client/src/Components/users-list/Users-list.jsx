// Components
import { Table } from '../table/Table';
import { UserTableBody } from '../user-table-body/User-table-body';
import { TableHeader } from '../table-header/Table-header';

export const UsersList = ({ users }) => {
  const headerTitles = {
    firstColumn: '№',
    secondColumn: 'Name',
    thirdColumn: 'Role',
    fourthColumn: 'Created Date',
  };

  return(
    <Table>
      <TableHeader headerTitles={headerTitles} />
      <UserTableBody tableData={users} />
    </Table>
  );
};