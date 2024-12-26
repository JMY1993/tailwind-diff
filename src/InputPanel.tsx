import { useState } from "react";
import { useDiffStore } from "./diffStore";

export function InputPanel({
  panelId,
  placeHolder = "Paste your classes...",
}: {
  panelId: number;
  placeHolder?: string;
}) {
  const input = useDiffStore((state) => state.inputs[panelId].values.join(" "));
  const title = useDiffStore((state) => state.inputs[panelId].name);
  const changeTitle = useDiffStore((state) => state.changeTitle);
  const changeInputValue = useDiffStore((state) => state.changeInputValue);
  const [isChangingTitle, setIsChangingTitle] = useState(false);
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800 overflow-hidden">
      <div className="border-b border-gray-800 px-4 py-2 flex justify-between items-center">
        {isChangingTitle ? (
          <input
            type="text"
            value={title}
            className="bg-transparent p-2 text-gray-300 font-mono text-sm focus:outline-none"
            onChange={(e) => {
                changeTitle(panelId, e.target.value);
            }}
            onBlur={() => setIsChangingTitle(false)}
            autoFocus
          />
        ) : (
          <h3
            className="text-sm font-medium text-gray-400 cursor-pointer"
            onClick={() => setIsChangingTitle(true)}
          >
            {title || "Untitled"}
          </h3>
        )}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <textarea
        value={input}
        onChange={(e) => {changeInputValue(panelId, e.target.value)}}
        className="w-full bg-transparent p-4 text-gray-300 font-mono text-sm focus:outline-none"
        placeholder={placeHolder}
        rows={3}
      />
    </div>
  );
}
