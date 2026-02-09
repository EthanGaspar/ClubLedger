import React, { useState, useEffect } from 'react'
import { useForgotPassword } from '../hooks/useForgotPassword'
import { Link } from "react-router-dom"
import { Mail, Sun, Moon } from "lucide-react"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'forest')

    const { forgotPassword, loading, error, success } = useForgotPassword()

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
        await forgotPassword(email)
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

                    {/* Forgot Password Card */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-1">Forgot your password?</h2>
                            <p className="text-base-content/60 mb-6">Enter your email to receive a reset link</p>

                            {success ? (
                                <div className="alert alert-success">
                                    <span>Check your email for a reset link. It expires in 15 minutes.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                                                <Mail className="size-5" />
                                            </span>
                                            <input
                                                type="email"
                                                placeholder="janedoe@example.com"
                                                className="input input-bordered w-full pl-10"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                            />
                                        </div>
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
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Back to login link */}
                    <p className="text-center mt-6 text-base-content/70">
                        Remember your password?{' '}
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
