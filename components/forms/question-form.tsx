"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RiCloseLine } from "@remixicon/react";
import { Editor } from "@tinymce/tinymce-react";
import { revalidatePath } from "next/cache";
import { useRouter, usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeProvider";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { QuestionSchema } from "@/lib/validations";

interface Props {
  userId: string;
  question?: string;
  edit?: boolean;
}

const QuestionForm = ({ userId, question, edit }: Props) => {
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  let parsedQuestion = {
    _id: "",
    title: "",
    content: "",
    tags: [],
  };
  if (question) parsedQuestion = JSON.parse(question);
  const Tags = parsedQuestion.tags.map((tag: { name: string }) => tag.name);
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: parsedQuestion.title,
      description: parsedQuestion.content,
      tags: Tags,
    },
  });

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
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
      field.value.filter((t: string) => t !== tag)
    );
  };

  const onSubmit = async (values: z.infer<typeof QuestionSchema>) => {
    try {
      if (edit) {
        await editQuestion({
          title: values.title,
          content: values.description,
          questionId: parsedQuestion._id,
          path: pathname,
        });
        setIsSubmitting(true);

        router.push(`/questions/${parsedQuestion._id}`);
      } else {
        await createQuestion({
          title: values.title,
          content: values.description,
          tags: values.tags,
          author: JSON.parse(userId),
          path: pathname,
        });
        setIsSubmitting(true);
        revalidatePath("/");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="text-primary">
                  Question Title
                  <span className="text-teal-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. How to use React Query?"
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
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="text-primary">
                  Question Description
                  <span className="text-teal-500">*</span>
                </FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(
                      evt,
                      editor // @ts-ignore
                    ) => (editorRef.current = editor)}
                    initialValue={parsedQuestion.content || ""}
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
                      content_style: "body { font-size:14px }",
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
                <FormLabel className="text-primary flex-start">
                  Tags
                  <span className="text-teal-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. react, typescript, react-query"
                    className="border-primary text-primary w-full border bg-transparent"
                    disabled={edit}
                    onKeyDown={(e) => {
                      handleKeyDown(e, field);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Press Enter to add a tag
                </FormDescription>
                <div className="flex items-center">
                  {field.value.map((tag: string) => (
                    <div
                      key={tag}
                      className="text-hover border-primary hover:border-hover flex w-fit items-center gap-2 rounded-md border px-2 py-1 text-xs"
                    >
                      <p>{tag}</p>
                      <RiCloseLine
                        size={18}
                        className={
                          edit ? "hidden" : "cursor-pointer hover:text-red-500"
                        }
                        onClick={() => handleTagRemove(tag, field)}
                      />
                    </div>
                  ))}
                </div>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default_small" disabled={isSubmitting}>
            {isSubmitting
              ? !edit
                ? "Posting Question..."
                : "Editing Question..."
              : !edit
                ? "Post Question"
                : "Edit Question"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuestionForm;
