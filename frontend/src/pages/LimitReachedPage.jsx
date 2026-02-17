import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../lib/axios'

const LimitReachedPage = () => {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [limits, setLimits] = React.useState(null)

  React.useEffect(() => {
    api.get('/constants').then(res => setLimits(res.data))
  }, [])

  const isMember = type === 'member'
  const limitValue = limits
    ? isMember ? limits.MAX_MEMBERS_PER_ACCOUNT : limits.MAX_USERS
    : null

  const message = isMember
    ? `You've reached the maximum limit of ${limitValue ?? '...'} members per account.`
    : `The maximum number of ${limitValue ?? '...'} user accounts has been reached.`

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
                Hey! We're still piloting our page and {message.toLowerCase()}
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
