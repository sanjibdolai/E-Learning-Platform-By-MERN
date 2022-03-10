import { useMemo } from "react";
import MyTable from "../components/MyTable";

function LearnersTable(){
    const columns = useMemo(
        () => [
          {
            Header: 'Name',
            columns: [
              {
                Header: 'First Name',
                accessor: 'firstName',
              },
              {
                Header: 'Last Name',
                accessor: 'lastName',
              },
            ],
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Age',
                accessor: 'age',
              },
              {
                Header: 'Visits',
                accessor: 'visits',
              },
              {
                Header: 'Status',
                accessor: 'status',
              },
              {
                Header: 'Profile Progress',
                accessor: 'progress',
              },
            ],
          },
        ],
        []
      )
    
      const data = useMemo(() => [], [])

    return(
        <MyTable columns={columns} data={data}/>
    );
}
export default LearnersTable;