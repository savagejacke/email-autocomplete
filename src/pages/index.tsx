export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center pb-5">
        Jan and Jack&apos;s Super Cool Email Autocomplete
      </h1>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold justify">
          Start writing email below
        </h2>
        <textarea className="w-1/2 h-32 p-2 mt-4 text-xl border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black" />
        <button className="px-4 py-2 mt-4 text-xl font-bold text-white bg-blue-500 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-blue-200">
          Submit
        </button>
      </div>
    </main>
  );
}
