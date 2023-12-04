import { useQuery } from "@tanstack/react-query";
import OpenAI from "openai";
import { useRef, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const unfinished = useRef(email);

  const {
    data: options,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["autocomplete"],
    queryFn: async () => {
      const res = await fetch(
        "/api/autocomplete?" + new URLSearchParams({ email })
      );

      return res.json() as Promise<
        OpenAI.Chat.Completions.ChatCompletionMessage[]
      >;
    },
    enabled: false,
  });

  const onOptionSelect = (opt: string) => {
    unfinished.current = email;
    setEmail(opt);
  };

  const undo = () => {
    setEmail(unfinished.current);
    unfinished.current = "";
  };

  return (
    <main className="w-screen h-screen">
      <h1 className="text-4xl font-bold text-center pb-5">
        Jan and Jack&apos;s Super Cool Email Autocomplete
      </h1>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold justify">
          Start writing email below
        </h2>
        <textarea
          className="w-1/2 h-32 p-2 mt-4 text-xl border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button
          className="px-4 py-2 mt-4 text-xl font-bold text-white bg-blue-500 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-blue-200"
          onClick={() => refetch()}
        >
          Generate options
        </button>
        {unfinished.current ? (
          <button
            className="px-4 py-2 mt-4 text-xl font-bold text-white bg-blue-500 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-blue-200"
            onClick={() => undo()}
          >
            Undo
          </button>
        ) : null}
      </div>
      {isFetching && <div>Generating emails...</div>}
      {options && options.length > 0 ? (
        <ul className="flex flex-col w-full">
          {options.map((opt) => (
            <li className="flex flex-row justify-around" key={opt.content}>
              <span>{opt.content}</span>
              <button onClick={() => onOptionSelect(opt.content || "")}>
                Accept
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
