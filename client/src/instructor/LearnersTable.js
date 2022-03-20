import { useMemo } from "react";
import MyTable from "../components/MyTable";
function Photo(){
  return (
    <>
   <img
                        alt="Logo"
                        src="/logo.png"
                        width={30}
                        height={30}
                    />
    </>
  );
}
function LearnersTable(){
    const columns = useMemo(
        () => [
          {
            Header: '',
            accessor: 'image',
            Cell: ({ cell: { value } }) => (
              <img
                src={value}
                width={30}
                height={30}
              />
            )

          },
          {
            Header: 'Learner Name',
            accessor: 'learnerName',
            Cell: ({row}) => (
            <span >{row.values.learnerName}</span>
            )
          },
          {
            Header: 'Email',
            accessor: 'email',
          }
          
        ],
        []
      );
    
    var arr=[];
    for(var i=1;i<100;i++){
      arr.push({image:"/logo.png",learnerName:"Sanjib Dolai",email:"fsdfs"},)
    }
      const data = useMemo(() => arr, [])

    return(
        <MyTable 
        columns={columns} 
        data={data} 
        tableProps={{className:"table table-hover table-border table-sm table-striped", width:"100%"}}
        tableHeaderProps={{}}
        tableBodyProps={{}}
        />
    );
}
export default LearnersTable;