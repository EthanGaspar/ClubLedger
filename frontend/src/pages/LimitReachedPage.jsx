import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../lib/axios'

const LimitReachedPage = () => {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [limits, setLimits] = React.useState(null)

  React.useEffect(() => {
    const fetchConstants = async () => {
      try {
        const res = await api.get('/constants')
        setLimits(res.data)
      } catch (error) {
        console.error('Error fetching constants:', error)
      }
    }
    fetchConstants()
  }, [])

  const isAccountLimit = type !== 'member'
  const limitValue = limits
    ? isAccountLimit ? limits.MAX_USERS : limits.MAX_MEMBERS_PER_ACCOUNT
    : null

  const message = isAccountLimit
    ? `The maximum number of ${limitValue ?? '...'} user accounts has been reached.`
    : `You've reached the maximum limit of ${limitValue ?? '...'} members per account.`

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Dashboard
          </Link>
          <div className="card bg-base-100">
            <div className="card-body text-center">
              <h2 className="card-title justify-center text-2xl mb-4">
                Limit Reached
              </h2>
              <p className="mb-4">
                Hey! We're still piloting and {message.toLowerCase()}
              </p>
              <p>
                Please reach out to{' '}
                <a href="mailto:support@club-ledger.com" className="link link-primary">
                  support@club-ledger.com
                </a>{' '}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LimitReachedPage
