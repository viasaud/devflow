"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RiCloseLine } from "@remixicon/react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter, usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
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
import { useTheme } from "@/context/ThemeProvider";
import { createQuestion } from "@/lib/actions/question.action";
import { QuestionSchema } from "@/lib/validations";

interface Props {
  mongoUserId: string;
}

const Question = ({ mongoUserId }: Props) => {
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const type = "question";
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key !== "Enter" || field.name !== "tags") return;

    e.preventDefault();
    const value = e.currentTarget.value.trim();

    if (value === "") return;
    if (field.value.includes(value as never)) {
      form.setError("tags", {
        type: "required",
        message: "Tag already exists",
      });
      return;
    }
    if (value.length > 20) {
      form.setError("tags", {
        type: "required",
        message: "Tag length should not exceed 20 characters",
      });
      return;
    }

    form.setValue("tags", [...field.value, value]);
    e.currentTarget.value = "";
    form.clearErrors("tags");
  };

  const handleTagRemove = (tag: string, field: any) => {
    form.setValue(
      "tags",
      field.value.filter((t: string) => t !== tag),
    );
  };

  const onSubmit = async (values: z.infer<typeof QuestionSchema>) => {
    try {
      await createQuestion({
        title: values.title,
        content: values.description,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });
      setIsSubmitting(true);

      router.push("/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="max-w-full lg:w-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 max-xl:px-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="text-default font-paragraph-semibold">
                  Question Title
                  <span className="text-orange-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. How to use React Query?"
                    className="bg-default border-default text-default no-focus w-full border outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="text-default font-paragraph-semibold">
                  Question Description
                  <span className="text-orange-500">*</span>
                </FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(
                      evt,
                      editor, // @ts-ignore
                    ) => (editorRef.current = editor)}
                    initialValue=""
                    onEditorChange={(content) =>
                      form.setValue("description", content)
                    }
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:14px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "default",
                    }}
                  />

                  {/* Tiptap text editor is better for styling reasons */}
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="text-default font-paragraph-semibold">
                  Tags
                  <span className="text-orange-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. react, typescript, react-query"
                    className="bg-default border-default text-default no-focus w-full border outline-none"
                    onKeyDown={(e) => {
                      handleKeyDown(e, field);
                    }}
                  />
                </FormControl>
                <div className="flex items-center">
                  {field.value.map((tag: string) => (
                    <div
                      key={tag}
                      className="text-secondary border-default hover:border-hover font-small-regular flex w-fit items-center gap-2 rounded-md border px-2 py-1"
                    >
                      <p>{tag}</p>
                      <RiCloseLine
                        size={18}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleTagRemove(tag, field)}
                      />
                    </div>
                  ))}
                </div>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"zinc"}
            className="mx-auto w-fit px-5 py-3"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? type === "question"
                ? "Posting Question..."
                : "Editing Question..."
              : type === "question"
                ? "Post Question"
                : "Edit Question"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Question;
