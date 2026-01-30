import React from 'react'
import { useLogin } from '../hooks/useLogin'

import { Link, useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"
import {useState} from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, loading, error } = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <h2 className="card-title text mb-6">Log in</h2>
                <div className="max-w-4xl mx-auto">
                    {/* <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5" />
                        Back to Members
                    </Link> */}
                    <div className="card bg-base-100">
                    <div className="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        placeholder="janedoe@example.com"
                        className="input input-bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>

                    <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>

                    <div className="card-actions justify-between">
                        <button
                            type="button"
                            className="btn btn-ghost bg-transparent"
                            onClick={() => navigate('/signup')}>
                            <span className='italic'>Don't have an account?</span>
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary" disabled={loading}>
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login 