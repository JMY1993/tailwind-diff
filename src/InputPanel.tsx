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
            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer"
            onClick={() => setIsChangingTitle(true)}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-current text-gray-800 dark:text-gray-300"
            >
              <title>Tailwind CSS</title>
              <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
            </svg>
            <span>{title || "Untitled (click to edit)"}</span>
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
        onChange={(e) => {
          changeInputValue(panelId, e.target.value);
        }}
        className="w-full bg-transparent p-4 text-gray-300 font-mono text-sm focus:outline-none"
        placeholder={placeHolder}
        rows={3}
      />
    </div>
  );
}
