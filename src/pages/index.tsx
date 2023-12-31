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

            <div className="flex justify-center pt-5">
                {isFetching && <LoadingSpinner />}
            </div>

            {options && options.length > 0 ? (
                <div className="flex justify-center">
                    <ul className="flex flex-col items-center space-y-10"> {/* Centering the items and adding space */}
                        {options.map((opt) => (
                            <li className="flex flex-row justify-between items-center w-3/4" key={opt.content}> {/* Aligning button to the right */}
                                <span className="flex-grow bg-gray-300 text-black rounded-md py-2 px-4 text-center">{opt.content}</span>
                                <button
                                    className="m-5 px-4 py-2 text-xl font-bold text-white bg-blue-500 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-blue-200"
                                    onClick={() => onOptionSelect(opt.content || "")}
                                >
                                    Accept
                                </button>
                            </li>
                        ))}
                    </ul>Í
                </div>
            ) : null}
        </main>
    );
}

function LoadingSpinner() {
    return (
        <div role="status">
            <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Generating Images...</span>
        </div>
    );
}
