import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.email) {
    res.status(400).json({ message: "Include an email" });
    return;
  }

  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: "user",
        content: "Give me a way to complete this email: " + req.query.email,
      },
    ],
    model: "gpt-3.5-turbo",
    n: 3,
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params);

  const result = chatCompletion.choices.map((choice) => choice.message);

  res.json(result);
}
