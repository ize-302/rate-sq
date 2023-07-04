import React from 'react'
import { Text, Pagination } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import NumberAbbreviate from 'number-abbreviate';
import { TitlesList } from './shared/TitlesList';

export const NewlyAdded = () => {
  const [data, setdata] = React.useState({})
  const router = useRouter()
  const [loading, setloading] = React.useState(true)
  const page = router.query.page ? router.query.page : 0


  React.useEffect(() => {
    setloading(true)
    axios.get(`/api/v1/titles?page=${page}&per_page=20`).then(response => {
      setdata(response.data)
      setloading(false)
    }).catch(err => {
      console.log(err)
      setloading(false)
    })

    return () => {
      setdata({})
    }
  }, [router])

  return (
    <div>
      <Text className='text-center text-xl md:text-2xl mb-10'>Newly added Shows</Text>

      <TitlesList loading={loading} titles={data.items} />

      {data.total_pages > 1 && (
        <div className="flex justify-between items-center mt-10">
          <span className="text-sm text-gray-700">
            Showing <span className="font-semibold text-gray-900">{data.from + 1}</span> {" "}
            {data.from !== data.to && (
              <>
                to <span className="font-semibold text-gray-900">{data.to + 1}</span> {" "}
              </>
            )}
            of <span className="font-semibold text-gray-900">{NumberAbbreviate(data.count)}</span> Entries
          </span>
          <Pagination styles={(theme) => ({
            control: {
              "&[data-active]": {
                background: '#062828',
              },
            },
          })} value={data.page} onChange={(page) => router.push({ query: { page: Number(page) } })} total={data.count} />
        </div>
      )}

    </div>
  )
}