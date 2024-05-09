"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IUser } from "@/database/user.model";
import { updateUser } from "@/lib/actions/user.action";
import { profileSchema } from "@/lib/validations";

import InputField from "./input-field";

export function ProfileForm({ user }: { user: string }) {
  const userData = JSON.parse(user) as IUser;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name,
      username: userData.username,
      location: userData.location,
      bio: userData.bio,
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsSubmitting(true);
    toast.success("Profile Updated Successfully");
    try {
      await updateUser({
        clerkId: userData.clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          location: values.location,
          bio: values.bio,
        },
        path: `/profile/${userData.username}`,
      });
      router.push(`/profile/${userData.username}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <InputField
          name="name"
          label="Name"
          placeholder="e.g. Saud Alshehri"
          form={form}
        />
        <InputField
          name="username"
          label="Username"
          placeholder="e.g. viasaud"
          form={form}
        />
        <InputField
          name="location"
          label="Location"
          placeholder="e.g. Saudi Arabia"
          form={form}
        />
        <InputField
          name="bio"
          label="Bio"
          placeholder="e.g. I am a software engineer..."
          form={form}
        />

        <Button type="submit" variant="default_small" disabled={isSubmitting}>
          {isSubmitting ? "Editing Profile..." : "Edit Profile"}
        </Button>
      </form>
    </Form>
  );
}
