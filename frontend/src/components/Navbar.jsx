import { PlusIcon, Sun, Moon, Settings } from 'lucide-react'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'emerald'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

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
            <div className='flex items-center gap-4'>
                <Link to={"/create"} className='btn btn-primary'>
                    <PlusIcon className='size-5'/>
                    <span>New Member</span>
                </Link>
                <Link to={"/settings"} className='btn btn-ghost'>
                    <Settings className='size-5'/>
                </Link>
                <button onClick={toggleTheme} className='btn btn-ghost'>
                    {theme === 'emerald' ? <Moon className='size-5'/> : <Sun className='size-5'/>}
                </button>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
