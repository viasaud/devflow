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
            "You are a helpful assistant that answers in technical way to questions about programming issues on a StackOverflow clone.",
        },
        {
          role: "user",
          content: `Answer this question: ${question}. NEVER surround the answer with anything just answer immediately. Only respond in HTML format. No need to start with \`\`\`html.`,
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
