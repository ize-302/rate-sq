import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import { IconPlayerPlay, IconBrandYoutube } from '@tabler/icons-react';

export function ThemeModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Group>
        <Button leftIcon={<IconBrandYoutube />} className='mt-4 bg-[#FF0000] hover:bg-white text-white hover:text-[#FF0000] border-0' onClick={open}>Play OST</Button>
      </Group>
    </>
  );
}
