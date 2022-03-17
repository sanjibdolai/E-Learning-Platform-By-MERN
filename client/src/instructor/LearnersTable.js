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
          },
          {
            Header: 'Learner Name',
            accessor: 'learnerName',
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
      arr.push({image:Photo(),learnerName:"Sanjib Dolai",email:"fsdfs"},)
    }
      const data = useMemo(() => arr, [])

    return(
        <MyTable  columns={columns} data={data}/>
    );
}
export default LearnersTable;