import { NextResponse } from "next/server";
import OpenAI from "openai";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that answers in technical way to questions about programming issues.",
        },
        {
          role: "user",
          content: `Answer this: ${question}. NEVER surround the answer.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json({
      reply: chatCompletion.choices[0].message.content,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
