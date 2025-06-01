import React from "react";

type Props = {
  message: {
    id: string;
    content: string;
    type: "ai";
    additional_kwargs?: object;
    response_metadata?: object;
  };
  isLoading?: boolean;
  handleRegenerate?: () => void;
};

export default function AIMessage({ message, isLoading }: Props) {
  return (
      <div className="group mr-auto flex justify-start">
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div className="rounded-3xl bg-[#fef7ef] px-4 py-2 text-sm font-medium text-left text-gray-900 whitespace-pre-wrap shadow">
          {message.content}
        </div>
      </div>
    </div>
  );
}
