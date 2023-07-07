import React from 'react'
import { Box, Group, Button, Rating, Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
import {
  IconUserCircle,
  IconMenu, IconDeviceTvOld
} from "@tabler/icons-react";
import Link from 'next/link';

export function Navigation({ user }) {
  const router = useRouter();

  return (
    <Box className="bg-green-50 border-b border-primary  h-[70px]">
      <Box
        className={
          "container px-4 h-full max-w-7xl flex mx-auto items-center justify-between"
        }
      >
        <Group className='flex flex-col gap-0 items-center cursor-pointer' onClick={() => router.push('/')}>
          <p className='m-0 font-semibold text-xl text-secondary'>RateSQ</p>
          <Rating defaultValue={5} className='m-0' size='xs' color='#6FDA86' />
        </Group>
        <div className='hidden md:block'>
          {!user ? (
            <Group>
              <Button
                onClick={() => router.push("/login")}
                className="bg-secondary hover:bg-secondary text-primary border-0 rounded-full font-medium px-7"
              >
                Log in
              </Button>
              <Button
                onClick={() => router.push("/create-account")}
                className="bg-primary hover:bg-primary text-secondary rounded-full border-0 font-700 px-7"
              >
                Create account
              </Button>
            </Group>
          ) : (
            <Group className="gap-4">
              <Link href='/account'>
                <Button className="bg-transparent hover:bg-transparent border-0 px-0 h-[30px] flex text-green-700">
                  <IconUserCircle strokeWidth={1.5} color="green" size={30} />
                  <span className='ml-1'>Account</span>
                </Button>
              </Link>
            </Group>
          )}
        </div>
        <div className='block md:hidden'>
          <IconMenu strokeWidth={1.5} color="green" size={30} />
        </div>
      </Box>
    </Box>
  );
}