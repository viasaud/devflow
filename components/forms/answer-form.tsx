"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RiBardFill } from "@remixicon/react";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTheme } from "@/context/ThemeProvider";
import { createAnswer } from "@/lib/actions/answer.action";
import { AnswerSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const AnswerForm = ({
  authorId,
  questionId,
  question,
}: {
  authorId: string;
  questionId: string;
  question: string;
}) => {
  const pathname = usePathname();
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = async (data: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: data.answer,
        path: pathname,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
      });
      form.reset();
      setIsSubmitting(false);
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-primary text-base font-semibold">Your Answer</p>
        <Button variant={"ai"} disabled={isSubmitting} onClick={() => {}}>
          <RiBardFill size={16} />
          Generate an AI answer
        </Button>
      </div>
      <form
        className="mt-1 flex max-w-full flex-col gap-10 lg:w-screen"
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
        <Button
          type="submit"
          variant={"zinc"}
          className="mx-auto w-fit px-5 py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </Button>
      </form>
    </Form>
  );
};

export default AnswerForm;
