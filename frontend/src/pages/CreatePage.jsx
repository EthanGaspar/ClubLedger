import React from 'react'
import api from '../lib/axios'
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../hooks/useAuthContext.jsx'
import useRoles from '../hooks/useRoles.jsx'


const CreatePage = () => {
  const { user } = useAuthContext()
  const { roles, loading: rolesLoading } = useRoles()
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [active, setActive] = React.useState(true)
  const [role, setRole] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [maxMembers, setMaxMembers] = React.useState(null)

  React.useEffect(() => {
    api.get("/constants").then(res => setMaxMembers(res.data.MAX_MEMBERS_PER_ACCOUNT))
  }, [])

  // Set default role once roles are loaded
  React.useEffect(() => {
    if (roles.length > 0 && !role) {
      setRole(roles[0])
    }
  }, [roles, role])

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error('You must be logged in')
      return
    }
    
    if (!firstName.trim() || !lastName.trim() || role === '') {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      await api.post("/members", {
        firstName,
        lastName,
        active,
        role
      }, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` 
        }
      });
      toast.success('Member created successfully')
      navigate('/')
    } catch (error) {
      if (error?.response?.status === 429) {
        toast.error('Too many requests. Please try again later.', {
          duration: 5000,
          icon: '⏳',
        })
        return
      }

      console.log("Error creating member:", error)
      if (error?.response?.data?.message === "Maximum number of members reached") {
        toast.error(`Member limit reached (max ${maxMembers})`)
      } else {
        toast.error('Failed to create member')
      }
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Members
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className = "card-title text">Create New Member</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Active</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={active ? "true" : "false"}
                    onChange={(e) => setActive(e.target.value === "true")}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={rolesLoading}
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Member'}
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

export default CreatePage
