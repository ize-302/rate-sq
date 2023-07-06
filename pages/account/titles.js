import AccountLayout from '@/components/layouts/Account.layout'
import { PaginationComponent } from '@/components/shared/PaginationComponent'
import { TitlesList } from '@/components/shared/TitlesList'
import { TitleContext } from '@/context/titleContext'
import { UserContext } from '@/context/userContext'
import React from 'react'

export default function AccountTitlesPage() {
  const { fetchUserTitles, usertitlesdata, loading } = React.useContext(TitleContext)
  const { user } = React.useContext(UserContext)
  React.useEffect(() => {
    fetchUserTitles(user.id)
    return () => {

    }
  }, [])


  return (
    <AccountLayout title='Submitted titles'>
      <TitlesList cols_class={'grid-cols-4'} loading={loading} titles={usertitlesdata.items} />
      <PaginationComponent data={usertitlesdata} />
    </AccountLayout>
  )
}