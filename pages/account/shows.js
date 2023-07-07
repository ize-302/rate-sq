import AccountLayout from '@/components/layouts/Account.layout'
import { PaginationComponent } from '@/components/shared/PaginationComponent'
import { ShowsList } from '@/components/shared/ShowsList'
import { ShowContext } from '@/context/showContext'
import { UserContext } from '@/context/userContext'
import { useRouter } from 'next/router'
import React from 'react'

export default function AccountShowsPage() {
  const { fetchUserShows, usershowsdata, loading, setloading } = React.useContext(ShowContext)
  const { user } = React.useContext(UserContext)
  const router = useRouter()

  React.useEffect(() => {
    setloading(true)
    fetchUserShows(user.id)
  }, [router]) // eslint-disable-line

  return (
    <AccountLayout show='Submitted shows'>
      <ShowsList cols_class={'grid-cols-4'} loading={loading} shows={usershowsdata.items} />
      <PaginationComponent data={usershowsdata} />
    </AccountLayout>
  )
}