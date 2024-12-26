import { InputPanel } from "./InputPanel";
import { ResultPanel } from "./ResultPanel";
import { useDiffStore } from "./diffStore";
import { Minus, Plus } from "lucide-react";

export default function App() {
  const inputs = useDiffStore((state) => state.inputs);
  const addOne = useDiffStore((state) => state.expandInputs);
  const subOne = useDiffStore((state) => state.shrinkInputs);
  const commonClasses = useDiffStore((state) => state.commonClasses);
  const diffClasses = useDiffStore((state) => state.diffClasses);

  const size = 18;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full backdrop-blur-md bg-black/30 border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Tailwind Diff
          </h1>
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
            <button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-lg
                       hover:from-purple-600 hover:to-pink-600 transition-all duration-200 mb-6"
            >
              Save Comparison
            </button>

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
