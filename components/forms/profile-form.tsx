"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { updateUser } from "@/lib/actions/user.action";
import { profileSchema } from "@/lib/validations";

export function ProfileForm({ mongoUser }: { mongoUser: string }) {
  const user = JSON.parse(mongoUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsSubmitting(true);
    toast({
      className:
        "text-primary border-primary border bg-primary dark:bg-gradient-to-r dark:from-zinc-950 dark:to-zinc-900 rounded-md",
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    try {
      await updateUser({
        clerkId: user.clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      router.push(`/profile/${user.username}`);
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name<span className="text-teal-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Saud Alshehri"
                  className="border-primary text-primary no-focus w-full border bg-transparent outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username<span className="text-teal-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. viasaud"
                  className="border-primary text-primary no-focus w-full border bg-transparent outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Location<span className="text-teal-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Saudi Arabia"
                  className="border-primary text-primary no-focus w-full border bg-transparent outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Bio<span className="text-teal-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. I am a software engineer..."
                  className="border-primary text-primary no-focus w-full border bg-transparent outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit" variant="default_small" disabled={isSubmitting}>
          {isSubmitting ? "Editing Profile..." : "Edit Profile"}
        </Button>
      </form>
    </Form>
  );
}
