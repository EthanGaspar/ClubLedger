import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import { Home } from 'lucide-react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import MemberCard from '../components/MemberCard';
import MembersNotFound from '../components/MembersNotFound.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [member, SetMember] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/members", {
          headers: { 
            Authorization: `Bearer ${user.token}` 
          }
        });
        console.log(res.data);
        SetMember(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching members:", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch members");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className = "text-center text-primary py-10">Loading Members...</div>}

        {member.length === 0 && !loading && !isRateLimited && <MembersNotFound />}

        {member.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {member.map(member => (
              <MemberCard key={member._id} member={member} setMember={SetMember} />
        ))}
      </div>
      )}
    </div>
    </div>
  )
};

export default HomePage
