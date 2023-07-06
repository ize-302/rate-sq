import AccountLayout from '@/components/layouts/Account.layout'
import { PaginationComponent } from '@/components/shared/PaginationComponent'
import { TitlesList } from '@/components/shared/TitlesList'
import { TitleContext } from '@/context/titleContext'
import { UserContext } from '@/context/userContext'
import { useRouter } from 'next/router'
import React from 'react'

export default function AccountTitlesPage() {
  const { fetchUserTitles, usertitlesdata, loading, setloading } = React.useContext(TitleContext)
  const { user } = React.useContext(UserContext)
  const router = useRouter()

  React.useEffect(() => {
    setloading(true)
    fetchUserTitles(user.id)
  }, [router])

  return (
    <AccountLayout title='Submitted titles'>
      <TitlesList cols_class={'grid-cols-4'} loading={loading} titles={usertitlesdata.items} />
      <PaginationComponent data={usertitlesdata} />
    </AccountLayout>
  )
}