import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.email) {
    res.status(400).json({ message: "Include and email" });
  }

  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: "user",
        content:
          "Give me three ways to complete this sentence in an email: " +
          req.body.email,
      },
    ],
    model: "gpt-3.5-turbo",
  };

  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params);

  res.json(chatCompletion.choices);
}
