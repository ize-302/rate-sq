import React from "react";
import { Card, Title, Text, TextInput, Button, Container } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { supabase } from "@/supabase";

export default function Login() {
  const [loading, setloading] = React.useState(false);
  const [showSuccess, setshowSuccess] = React.useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const handleSignin = async () => {
    setloading(true);
    const { data } = await supabase
      .from("profiles")
      .select()
      .eq("email", form.values.email)
      .single();

    if (!data) {
      setloading(false);
      form.values.email = "";
      notifications.show({
        title: "User not found",
        message: "User with such email address does not exist",
        color: "red",
        icon: <IconX />,
      });
    } else {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: form.values.email,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        setshowSuccess(true);
        if (error) throw error;
        setloading(false);
        form.values.email = "";
      } catch (error) { }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col w-full">
        <form onSubmit={form.onSubmit(() => handleSignin())}>
          <TextInput
            label="Your email"
            placeholder="Your email address"
            disabled={loading}
            {...form.getInputProps("email")}
          />
          <Button
            type="submit"
            className={
              "bg-primary w-full mt-4 hover:bg-primary hover:opacity-70"
            }
            loading={loading}
          >
            Sign in
          </Button>
        </form>
      </div>
    </>
  );
}