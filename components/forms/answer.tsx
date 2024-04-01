"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTheme } from "@/context/ThemeProvider";
import { AnswerSchema } from "@/lib/validations";

import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const Answer = () => {
  const editorRef = useRef(null);
  const { mode } = useTheme();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = async (data: z.infer<typeof AnswerSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex max-w-full flex-col gap-10 max-xl:px-8 lg:w-screen"
        onSubmit={form.handleSubmit(handleCreateAnswer)}
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  onInit={(
                    evt,
                    editor // @ts-ignore
                  ) => (editorRef.current = editor)}
                  onEditorChange={(content) => form.setValue("answer", content)}
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
                    content_style: "body { font-family:Inter; font-size:14px }",
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
      </form>
    </Form>
  );
};

export default Answer;
