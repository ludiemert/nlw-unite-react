import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeaderTh } from './table/table-header-th'
import { TableCellTd } from './table/table-cell-td'
import { TableRowTr } from './table/table-row'
import { ChangeEvent, useEffect, useState } from 'react'


dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee {
  id: string
  name: string
  email: string
  checkedInAt: string | null
  createdAt: string
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''

    }

    return ''

  })

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }
    return 1
  })


  //Estado que calcula total de participantes do evento
  const [total, setTotal] = useState(0)

  //criar Estado para attendees com o BD
  const [attendees, setAttendees] = useState<Attendee[]>([])

  const totalPages = Math.ceil(total / 10)

  // um jeito de usar =>  fetch(`http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?page
  useEffect(() => {
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

    url.searchParams.set('pageIndex', String(page - 1))

    url.searchParams.set('query', search)
    //    url.searchParams.set('query', 'Anna')

    if (search.length > 0) {
      url.searchParams.set('query', search)
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAttendees(data.attendees)
        setTotal(data.total)
      })
  }, [page, search])

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set('search', search);

    window.history.pushState({}, '', url);

    setSearch(search);
  }


  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set('page', String(page));

    window.history.pushState({}, '', url);

    setPage(page)
  }



  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)


    {/* 
  //URL State 
  //const searchParams = new URLSearchParams(window.location.search)
  const url = new URLSearchParams(window.location.toString())

  //esse codigo faz o mesmo que:  `?page-1&search=Luciana` before it was as an object { page:1, search: 'Luciana'}
  url.searchParams.set('page', String(page + 1))

  //window.location.search = searchParams.toString()
  window.history.pushState({}, "", url);
  //https://developer.mozilla.org/pt-BR/docs/Web/API/Push_API read about API
  }  */}

    setCurrentPage(page + 1)

  }

  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  return (
    <div className=' flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Attendees</h1>
        <div className="px-3 w-72 py-1.5 border  border-white/20 rounded-lg text-sm flex items-center gap-3 ">
          <Search className='size-4 text-emerald-300' />
          <input
            onChange={onSearchInputChange}
            value={search}
            className=" bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Find Attendee.....🧐" />
        </div>

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

          {attendees.map((attendee) => {
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
                <TableCellTd >{dayjs().to(attendee.createdAt)}</TableCellTd>
                <TableCellTd >{attendee.checkedInAt === null ? <span className=' text-zinc-400'>Not check-in</span> : dayjs().to(attendee.checkedInAt)}
                </TableCellTd>
                <TableCellTd >
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
            <TableCellTd colSpan={3}>
              Showing {attendees.length} of {total} items
            </TableCellTd>
            <TableCellTd className='text-right' colSpan={3}>
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