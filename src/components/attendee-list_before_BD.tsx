import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeaderTh } from './table/table-header-th'
import { TableCellTd } from './table/table-cell-td'
import { TableRowTr } from './table/table-row'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees';

dayjs.extend(relativeTime)
dayjs.locale('pt-br')


export function AttendeeList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(attendees.length / 10)




  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToFirstPage() {
    setPage(1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }

  return (
    <div className=' flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Attendees</h1>
        <div className="px-3 w-72 py-1.5 border  border-white/20 rounded-lg text-sm flex items-center gap-3 ">
          <Search className='size-4 text-emerald-300' />
          <input onChange={onSearchInputChange} className=" bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Find Attendee.....🧐" />
        </div>

        {search}
      </div>

      <Table>

        <thead>
          <tr className='border-b border-white/20 '>
            <TableHeaderTh style={{ width: 48 }} >
              <input type='checkbox' className='size-4 bg-black/20 rounded border border-white/10' />
            </TableHeaderTh>
            <TableHeaderTh >Codig</TableHeaderTh>
            <TableHeaderTh >Attendee</TableHeaderTh>
            <TableHeaderTh >Registration Date</TableHeaderTh>
            <TableHeaderTh  >Check-in Date</TableHeaderTh>
            <TableHeaderTh style={{ width: 64 }} ></TableHeaderTh>
          </tr>
        </thead>
        <tbody>

   {/* */}
              {/*  {Array.from({ length: 8 }).map((_, i) => {  
          {attendees.map((attendee) => {  */}

          {attendees.slice((page - 1) * 10, page * 10).map((attendee) =>{
            return (
              <TableRowTr key={attendee.id} className='border-b border-white/20  hover:bg-white/10'>
                <TableCellTd >
                  <input type='checkbox' className='size-4 bg-black/20 rounded border border-white/10' />
                </TableCellTd >
                <TableCellTd >{attendee.id}</TableCellTd>
                <TableCellTd >
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-white'>{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCellTd>
                <TableCellTd >{dayjs().to(attendee.createAt)}</TableCellTd>
                <TableCellTd >{dayjs().to(attendee.checkedInAt)}</TableCellTd>
                <TableCellTd >
                  {/*  comentario 
                <button className='bg-black/20 border border-white/10 rounded-md p-1.5'>
                  <MoreHorizontal className='size-4' />
                </button>
                              OR bx  <IconButton transparent={true} >
                */}

               

                  <IconButton transparent>
                    <MoreHorizontal className='size-4' />
                  </IconButton>
                </TableCellTd>
              </TableRowTr>
            )
          })}



        </tbody>
        <tfoot>
          <tr>
            <TableCellTd  colSpan={3}>
            Showing 10 of {attendees.length} items
            </TableCellTd>
            <TableCellTd  className='text-right' colSpan={3}>
              <div className='inline-flex items-center gap-8'>
                <span> Page {page} of {totalPages} </span>


                <div className='flex gap-1.5'>

                  <IconButton onClick={goToFirstPage} disabled={page === 1} >
                    <ChevronsLeft className='size-4' />
                  </IconButton>

                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className='size-4' />
                  </IconButton>

                  <IconButton onClick={goToNextPage} disabled={page === totalPages} >
                    <ChevronRight className='size-4' />
                  </IconButton>

                  <IconButton onClick={goToLastPage} disabled={page === totalPages} >
                    <ChevronsRight className='size-4' />
                  </IconButton>
                </div>
              </div>
            </TableCellTd>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}