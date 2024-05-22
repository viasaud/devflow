"use client";

import { Editor } from "@tinymce/tinymce-react";
import React from "react";

import { useTheme } from "@/context/ThemeProvider";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

interface props {
  form: any;
  parsedQuestion?: any;
  name: string;
  label?: string;
  editorRef: any;
}

const TinyEditor = ({
  form,
  parsedQuestion,
  name,
  label,
  editorRef,
}: props) => {
  const { mode } = useTheme();

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="flex w-full flex-col">
          {label && (
            <FormLabel className="text-primary">
              {label}
              <span className="text-teal-500">*</span>
            </FormLabel>
          )}
          <FormControl>
            <Editor
              apiKey={process.env.TINYMCE_API_KEY}
              onInit={(
                evt,
                editor // @ts-ignore
              ) => (editorRef.current = editor)}
              initialValue={parsedQuestion?.content || ""}
              onEditorChange={(content) => form.setValue(name, content)}
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
  );
};

export default TinyEditor;
