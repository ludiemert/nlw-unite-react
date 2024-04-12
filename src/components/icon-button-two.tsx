import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<'button'>{}
export function IconButtonTwo(props: IconButtonProps) {
  return (
    <button {...props} className='bg-white/20 border border-white/10 rounded-md p-1.5' />

  )
}

//OU usar o cod
// <button {...props}>{props.children}</button>
// <button {...props} children="Text do botao"/>