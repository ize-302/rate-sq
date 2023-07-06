import { Pagination } from '@mantine/core'
import { useRouter } from 'next/router'
import NumberAbbreviate from 'number-abbreviate'
import React from 'react'

export const PaginationComponent = ({ data }) => {
  const router = useRouter()

  return (
    <>
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
          })} value={!router.query.page ? 1 : Number(data.page)} onChange={(page) => router.push({ query: { page: Number(page) } })} total={data.total_pages} />
        </div>
      )}
    </>
  )
}