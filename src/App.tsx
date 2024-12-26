import { InputPanel } from "./InputPanel";
import { ResultPanel } from "./ResultPanel";
import { useDiffStore } from "./diffStore";
import { Minus, Plus, RefreshCcw } from "lucide-react";

import { SaveDiffsDialog } from "./SaveDiffs";
import { LoadDiffsDialog } from "./LoadDiffs";

export default function App() {
  const inputs = useDiffStore((state) => state.inputs);
  const addOne = useDiffStore((state) => state.expandInputs);
  const subOne = useDiffStore((state) => state.shrinkInputs);
  const reset = useDiffStore((state) => state.reset);
  const commonClasses = useDiffStore((state) => state.commonClasses);
  const diffClasses = useDiffStore((state) => state.diffClasses);

  const size = 18;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full backdrop-blur-md bg-black/30 border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <h1 className="text-2xl font-bold">
            <div className="flex items-center space-x-2">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <defs>
                  <linearGradient
                    id="tailwindGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#e2c4ff" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#tailwindGradient)"
                  d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
                />
              </svg>
              <span className="bg-gradient-to-r from-purple-300 to-pink-600 bg-clip-text text-transparent">
                Tailwind Diff
              </span>
            </div>
          </h1>
          <a
            href="https://github.com/JMY1993/tailwind-diff"
            className="ml-auto"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 fill-current text-gray-800 dark:text-gray-300"
            >
              <title>github: JMY1993/tailwind-diff</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
          {/* Input Panels */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 justify-end">
              <button
                onClick={addOne}
                className="inline-flex items-center justify-center p-2 rounded-md bg-gray-900 hover:bg-gray-800 focus:outline-none transition duration-200"
              >
                <Plus size={size} />
              </button>
              <button
                onClick={subOne}
                className="inline-flex items-center justify-center p-2 rounded-md bg-gray-900 hover:bg-gray-800 focus:outline-none transition duration-200"
              >
                <Minus size={size} />
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center justify-center p-2 rounded-md bg-gray-900 hover:bg-gray-800 focus:outline-none transition duration-200"
              >
                <RefreshCcw size={size} />
              </button>
            </div>
            {inputs.map((_, i) => (
              <InputPanel
                key={i}
                panelId={i}
                placeHolder="Paste your first set of classes..."
              />
            ))}
          </div>

          {/* Results Panel */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800 p-6 h-fit sticky top-24">
            <div className="flex justify-between items-center mb-6 gap-6">
              <SaveDiffsDialog />
              <LoadDiffsDialog />
            </div>

            <div className="space-y-6">
              <ResultPanel
                title="Common Classes"
                copiedContent={commonClasses.join(" ")}
              >
                {commonClasses.map((cls) => (
                  <span
                    key={cls}
                    className="inline-block bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded mr-2 mb-2"
                  >
                    {cls}
                  </span>
                ))}
              </ResultPanel>
              {diffClasses.map((diff, i) => (
                <ResultPanel
                  key={i}
                  title={diff.name}
                  copiedContent={diff.values.join(" ")}
                >
                  {diff.values.map((cls) => (
                    <span
                      key={cls}
                      className="inline-block bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded mr-2 mb-2"
                    >
                      {cls}
                    </span>
                  ))}
                </ResultPanel>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
