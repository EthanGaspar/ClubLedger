import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../lib/axios.js';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';


const MemberDetailPage = () => {
  const [member, setMember] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [active, setActive] = React.useState(true)
  const [role, setRole] = React.useState('Member')
  
  


  const navigate = useNavigate();

  const id = useParams().id;

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const res = await api.get(`/members/${id}`);
                setMember(res.data);
            } catch (error) {
                console.log("Error fetching member:", error);
                toast.error("Failed to fetch member");
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [id]);

    console.log( member );

    if (loading) {
      return <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-8' />
      </div>
    }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await api.delete(`/members/${id}`);
        toast.success("Member deleted successfully");
        navigate('/');
      } catch (error) {
        console.log("Error deleting member:", error);
        toast.error("Failed to delete member");
      }
    }
  }

  const handleSave = async () => {
    if (!member.firstName.trim() || !member.lastName.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setSaving(true);
    
    try {
      await api.put(`/members/${id}`, member);
      toast.success("Member updated successfully");
      navigate('/');
    } catch (error) {
      console.log("Error saving member:", error);
      toast.error("Failed to update member");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Members
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='size-4' />
              Delete Member
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>First Name</span>
                </label>
                <input
                  type='text'
                  className='input input-bordered'
                  value={member.firstName}
                  onChange={(e) => setMember({...member, firstName: e.target.value})}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Last Name</span>
                </label>
                <input
                  type='text'
                  className='input input-bordered'
                  value={member.lastName}
                  onChange={(e) => setMember({...member, lastName: e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Active</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={member.active ? "true" : "false"}
                  onChange={(e) => setMember({...member, active: e.target.value})}
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
                    value={member.role}
                    onChange={(e) => setMember({...member, role: e.target.value})}
                  >
                    <option value="Member">Member</option>
                    <option value="Officer">Officer</option>
                    <option value="President">President</option>
                    <option value="Advisor">Advisor</option>
                    <option value="Guest">Guest</option>
                  </select>
              </div>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberDetailPage
