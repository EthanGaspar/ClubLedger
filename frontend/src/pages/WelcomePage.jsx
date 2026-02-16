import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sun, Moon, Users, ClipboardCheck, Tag } from 'lucide-react'
import SampleLight from '../media/welcomePageImgs/SampleLight.png'
import SampleDark from '../media/welcomePageImgs/SampleDark.png'

const WelcomePage = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'forest')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        const newTheme = theme === 'forest' ? 'emerald' : 'forest'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    const features = [
        {
            icon: <Users className="size-8" />,
            title: 'Member Management',
            description: 'Add, edit, and organize your club members in one place.',
        },
        {
            icon: <Tag className="size-8" />,
            title: 'Role Management',
            description: 'Assign custom roles to categorize and manage members.',
        },
        {
            icon: <ClipboardCheck className="size-8" />,
            title: 'Event & Attendance Tracking (Coming Soon)',
            description: 'Track who\'s present with a simple, intuitive interface.',
        },
    ]

    return (
        <div className="min-h-screen bg-base-200 flex flex-col">
            {/* Top Nav Bar */}
            <div className="w-full flex items-center justify-end gap-3 px-4 py-3">
                <div className="flex gap-3">
                    <Link to="/login" className="btn btn-outline btn-sm w-32">
                        Log In
                    </Link>
                    <Link to="/signup" className="btn btn-primary btn-sm w-32">
                        Get Started
                    </Link>
                </div>
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle"
                    aria-label="Toggle theme"
                >
                    {theme === 'forest' ? (
                        <Sun className="size-5" />
                    ) : (
                        <Moon className="size-5" />
                    )}
                </button>
            </div>

            {/* Hero Section */}
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="text-center max-w-2xl">
                    <h1 className="text-5xl font-bold font-mono tracking-tight text-primary mb-3">
                        ClubLedger
                    </h1>
                    <p className="text-xl text-base-content/70 mb-2">
                        Club mangment simplified
                    </p>
                    <p className="text-base-content/50 mb-8 max-w-md mx-auto">
                        A simple platform to manage your club members and keep track of attendance — all in one place.
                    </p>
                    <img
                        src={theme === 'forest' ? SampleDark : SampleLight}
                        alt="ClubLedger preview"
                        className="rounded-lg shadow-xl max-w-full md:max-w-2xl mx-auto"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="px-4 pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div key={feature.title} className="card bg-base-100 shadow-xl">
                                <div className="card-body items-center text-center">
                                    <div className="text-primary mb-2">
                                        {feature.icon}
                                    </div>
                                    <h3 className="card-title text-lg">{feature.title}</h3>
                                    <p className="text-base-content/60">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-base-100 py-12 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                    <Link to="/signup" className="btn btn-primary">
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage
