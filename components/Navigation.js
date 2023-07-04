import React from 'react'
import { Box, Group, Button, Menu, Rating, Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
import {
  IconLogout,
  IconUserCircle,
  IconMenu, IconDeviceTvOld
} from "@tabler/icons-react";
import { removeTokenFromCookies } from '@/utils/cookies.utils';

export function Navigation({ user }) {
  const router = useRouter();

  const signOut = () => {
    removeTokenFromCookies()
    router.reload()
  }

  return (
    <Box className="bg-green-50 border-b border-primary  h-[70px]">
      <Box
        className={
          "container px-4 h-full max-w-7xl flex mx-auto items-center justify-between"
        }
      >
        <Group className='flex flex-col gap-0 items-center cursor-pointer' onClick={() => router.push('/')}>
          <p className='m-0 font-semibold text-xl text-secondary'>RateTSQ</p>
          <Rating defaultValue={5} className='m-0' size='sm' color='#6FDA86' />
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
              <Tooltip label="Add new show">
                <Button onClick={() => router.push({ pathname: 'search' })} className="bg-green-800 hover:bg-green-800 border-0 px-1" style={{ height: '26px' }}>
                  <IconDeviceTvOld strokeWidth={1.5} color="#fff" size={20} />
                </Button>
              </Tooltip>

              <Menu shadow="md" width={120} position="bottom-end" trigger="hover">
                <Menu.Target>
                  <Button className="bg-transparent hover:bg-transparent border-0 px-0 h-[30px]">
                    <IconUserCircle strokeWidth={1.5} color="green" size={30} />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    className="py-1"
                    onClick={() => signOut()}
                    icon={<IconLogout size={14} />}
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
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