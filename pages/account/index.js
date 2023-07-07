import React from 'react'
import AccountLayout from '@/components/layouts/Account.layout'
import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { UserContext } from '@/context/userContext';

export default function AccountPage() {
  const { user, updateProfile, loading } = React.useContext(UserContext)

  const form = useForm({
    initialValues: {
      display_name: '',
      email: '',
    },
    validate: {
      display_name: (value) => value ? null : 'Name is required',
    },
  });

  React.useEffect(() => {
    form.setFieldValue('display_name', user?.display_name);
    form.setFieldValue('email', user?.email);
  }, [user])

  return (
    <AccountLayout title='My account'>
      <form className='max-w-md flex flex-col gap-4' onSubmit={form.onSubmit((values) => updateProfile(values))}>
        <TextInput
          placeholder="Display name"
          label="Display name"
          withAsterisk
          {...form.getInputProps('display_name')}
        />
        <TextInput
          placeholder="Email address"
          label="Email address"
          withAsterisk
          disabled
          {...form.getInputProps('email')}
        />
        <Button loading={loading} type='submit' className='mt-4 border-0 bg-secondary hover:bg-secondary'>Update</Button>
      </form>
    </AccountLayout>
  )
}