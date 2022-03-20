import { useState } from 'react';
import { Col, Pagination, InputGroup, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table';


function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)


  return (
    <InputGroup size="sm" className="mb-2">
      <InputGroup.Text ><i className="fas fa-search"></i></InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }} />
    </InputGroup>
  );
}

function MyTable({ columns, data, tableProps, tableHeaderProps, tableBodyProps }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }

  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    usePagination
  )
  return (
    <>
      <Row>
        <Col lg={9}>
          <label className="mb-2">
            Show{' '}
            <select className='form-control-sm'
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            {' '}entries
          </label>
        </Col>
        <Col lg={3}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <table {...getTableProps()} {...tableProps}>
            <thead {...tableHeaderProps}>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} {...tableBodyProps}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {

                      return (
                        <td key={cell.column.id} {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rows.length === 0 &&
            <h6 className='text-center mb-3'>No data found...</h6>
          }
        </Col>
      </Row>
      <Row>
        <Col>
          Showing {state.pageSize * pageIndex + 1} to {state.pageSize * pageIndex + state.pageSize > rows.length ? rows.length : state.pageSize * pageIndex + state.pageSize} of {rows.length} entries
        </Col>
        <Col >
          <Pagination className="float-end">
            <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
            <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
          
            <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
            <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
          </Pagination>
        </Col>
      </Row>
    </>
  );
}
export default MyTable;