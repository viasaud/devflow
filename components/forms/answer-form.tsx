"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RiLoaderLine, RiSparkling2Fill } from "@remixicon/react";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createAnswer } from "@/lib/actions/answer.action";
import { AnswerSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import { Form } from "../ui/form";

import TinyEditor from "./tiny-editor";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);

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
      revalidatePath(pathname);
      toast.success("Answer submitted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    if (!authorId) return;
    setIsSubmittingAI(true);

    try {
      const response = await fetch(`/api/chatgpt`, {
        method: "POST",
        body: JSON.stringify({
          question,
        }),
      });

      const data = await response.json();

      const formattedAnswer = data.reply.replace(/<br>/g, "\n");
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent(formattedAnswer);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <Form {...form}>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-primary">Your Answer</p>
        <Button
          variant={"ai"}
          disabled={isSubmittingAI}
          onClick={generateAIAnswer}
          className="group disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmittingAI ? (
            <RiLoaderLine
              size={16}
              className="animate-spin duration-1000 group-hover:scale-125"
            />
          ) : (
            <RiSparkling2Fill
              size={16}
              className="duration-300 group-hover:scale-125"
            />
          )}
          Generate an AI answer
        </Button>
      </div>
      <form
        className="mb-20 mt-1 flex max-w-full flex-col gap-10 lg:w-screen"
        onSubmit={form.handleSubmit(handleCreateAnswer)}
      >
        <TinyEditor name="answer" form={form} editorRef={editorRef} />
        <Button type="submit" variant="default_small" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </Button>
      </form>
    </Form>
  );
};

export default AnswerForm;
