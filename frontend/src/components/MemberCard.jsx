import { PenSquare, PenSquareIcon, Trash2Icon } from 'lucide-react';
import {formatDate} from '../lib/utils.js';
import React from 'react'
import { Link } from 'react-router-dom';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const MemberCard = ({member, setMember}) => {

    const handleDelete = async (e, id) => {
        e.preventDefault(); // Prevent navigation

        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                await api.delete(`/members/${id}`);
                setMember((prev) => prev.filter(m => m._id !== id)); // Update state to remove deleted member
                toast.success("Member deleted successfully");
            } catch (error) {
                console.log("Error deleting member:", error);
                toast.error("Failed to delete member");
            }
        }
    }

    return <Link to={`/member/${member._id}`}
        className='card bg-base-100 hover:shadow-lg transition-all duration-200
        border-t-4 border-solid border-[#4ADE80]'
    >
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{member.firstName} {member.lastName}</h3>
            <p className="text-base-content/70 line-clamp-3"> {member.active ? "Active" : "Inactive"}</p>
            <p className="text-base-content/70 line-clamp-3"> {member.role}</p>
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(member.createdAt))}
                </span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'></PenSquareIcon>
                </div>
                <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, member._id)}>
                    <Trash2Icon className='size-4'></Trash2Icon>
                </button>
        </div>
    </Link>
};

export default MemberCard
