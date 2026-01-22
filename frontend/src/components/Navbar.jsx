import { PlusIcon, Sun, Moon, Settings, LogOut} from 'lucide-react'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'emerald'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function loggedIn() {
    <span>Testing</span>
    if (user) {
      return (
      <>
        <span className='text-sm hidden sm:inline'>{user.email}</span>
        <button onClick={logout} className='btn btn-ghost btn-sm sm:btn-md'>
            <LogOut className='size-5'/>
            <span className="hidden sm:inline">Log out</span>
        </button>
      </>
      )
    } else {
      return ( 
        <>
          <Link to={"/login"} className='btn btn-ghost btn-sm sm:btn-md'>
              <span>Log in</span>
          </Link>
          <Link to={"/signup"} className='btn btn-ghost btn-sm sm:btn-md'>
              <span>Sign up</span>
          </Link>
        </>
      )
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'emerald' ? 'forest' : 'emerald')
  }

  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <Link to={"/"} className={`text-3xl font-bold font-mono tracking-tight btn btn-ghost rounded-full ${theme === 'emerald' ? 'text-primary-focus' : 'text-primary'}`}>
                RollCall
            </Link>
            <div className='flex items-center gap-1 sm:gap-4'>

                <Link to={"/create"} className='btn btn-primary btn-sm sm:btn-md'>
                    <PlusIcon className='size-5'/>
                    <span className="hidden sm:inline">New Member</span>
                </Link>

                <Link to={"/settings"} className='btn btn-ghost btn-sm sm:btn-md'>
                    <Settings className='size-5'/>
                </Link>

                <button onClick={toggleTheme} className='btn btn-ghost btn-sm sm:btn-md'>
                    {theme === 'emerald' ? <Moon className='size-5'/> : <Sun className='size-5'/>}
                </button>

                {loggedIn()}

            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
