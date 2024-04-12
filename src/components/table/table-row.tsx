import { ComponentProps } from "react";

interface TableRowTrProps extends ComponentProps<'tr'> {}

export function TableRowTr(props: TableRowTrProps) {
  return (
    <tr className='border-b border-white/20  hover:bg-white/10' {...props} />
  )
}


