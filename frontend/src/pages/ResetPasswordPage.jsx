import React, { useState, useEffect } from 'react'
import { useResetPassword } from '../hooks/useResetPassword'
import { Link, useParams } from "react-router-dom"
import { Lock, Sun, Moon } from "lucide-react"

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'forest')
    const { token } = useParams()

    const { resetPassword, loading, error } = useResetPassword()

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        const newTheme = theme === 'forest' ? 'emerald' : 'forest'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await resetPassword(token, password)
    }

    return (
        <div className='min-h-screen bg-base-200 flex flex-col'>
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4">
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

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Brand Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-mono tracking-tight text-primary">
                            RollCall
                        </h1>
                        <p className="text-base-content/60 mt-1">
                            Track attendance easily
                        </p>
                    </div>

                    {/* Reset Password Card */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-1">Reset your password</h2>
                            <p className="text-base-content/60 mb-6">Enter your new password</p>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-control mb-6">
                                    <label className="label">
                                        <span className="label-text">New Password</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                                            <Lock className="size-5" />
                                        </span>
                                        <input
                                            type="password"
                                            placeholder="Enter your new password"
                                            className="input input-bordered w-full pl-10"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-base-content/50 mt-2 ml-1">
                                        Min 8 chars, uppercase, lowercase, number, symbol
                                    </p>
                                </div>

                                {error && (
                                    <div className="alert alert-error mb-4">
                                        <span>{error}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={loading}
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Back to login link */}
                    <p className="text-center mt-6 text-base-content/70">
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Back to Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
