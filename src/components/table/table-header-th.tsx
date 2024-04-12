import { ComponentProps } from "react";

interface TableHeaderThProps extends ComponentProps<'th'> {}

export function TableHeaderTh(props: TableHeaderThProps) {
  return (

    <th className='py-3 px-4 text-sm font-semibold text-left' {...props} /> 
  )
}

