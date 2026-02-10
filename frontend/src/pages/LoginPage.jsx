import React, { useState, useEffect } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from "react-router-dom"
import { Mail, Lock, Sun, Moon, Eye, EyeOff } from "lucide-react"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'forest')

    const { login, loading, error } = useLogin()

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
        await login(email, password)
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

                    {/* Login Card */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-1">Welcome back</h2>
                            <p className="text-base-content/60 mb-6">Sign in to your account</p>

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

                                <div className="form-control mb-6">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                                            <Lock className="size-5" />
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="input input-bordered w-full pl-10 pr-10"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/40 hover:text-base-content/70"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                        </button>
                                    </div>
                                    <div className="text-right mt-1">
                                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                                            Forgot password?
                                        </Link>
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
                                    {loading ? 'Logging in...' : 'Log in'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sign up link */}
                    <p className="text-center mt-6 text-base-content/70">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
