import { ClipboardCheck, Copy } from "lucide-react";
import { useState } from "react";

export function ResultPanel({
  children,
  title,
  copiedContent,
}: {
  children: React.ReactNode;
  title: string;
  copiedContent: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copiedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
        >
          <CopyButton copied={copied} />
        </button>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-3">{children}</div>
    </div>
  );
}

function CopyButton({ copied }: { copied: boolean }) {
  const size = 19;
  const animationClass =
    "transition-transform transform hover:scale-110 active:scale-90 duration-200";

  return !copied ? (
    <Copy size={size} className={animationClass} />
  ) : (
    <ClipboardCheck
      size={size}
      className={`${animationClass} text-green-700`}
    />
  );
}