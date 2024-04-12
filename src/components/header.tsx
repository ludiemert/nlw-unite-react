import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
   <div className='flex items-center gap-5 py-2'>
    <img src={nlwUniteIcon}  />

    <nav className='flex items-center gap-5'>
    <NavLink href="/eventos">Events</NavLink>
    <NavLink href="/participantes">Attendees</NavLink>  
    <NavLink href="/participantes">Links</NavLink>    
    </nav>
   </div>

  )
}