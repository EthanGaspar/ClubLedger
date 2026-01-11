import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { ArrowLeftIcon, Users } from "lucide-react"

const SettingsPage = () => {
  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-4xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Members
          </Link>

          <h1 className="text-2xl font-bold px-4 py-4">Settings</h1>

          {/* Roles Section */}
          <div className="card bg-base-100 mb-6">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Users className="size-6 text-primary" />
                <h2 className="card-title">Roles</h2>
              </div>
              <p className="text-base-content/70 mb-4">
                Manage the available roles that can be assigned to members.
              </p>
              <div className="divider my-2"></div>
              {/* Role management content will go here */}
              <div className="text-base-content/50 text-center py-8">
                Role configuration coming soon
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SettingsPage