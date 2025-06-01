import React from "react";

type Props = {
  message: {
    id: string;
    content: string;
    type: "human";
    additional_kwargs?: object;
    response_metadata?: object;
  };
  isLoading?: boolean;
};

export default function HumanMessage({ message }: Props) {
  return (
   <div className="group ml-auto flex justify-end">
      <div className="flex flex-col gap-1 max-w-[80%]">
        <p className="ml-auto rounded-3xl bg-gray-400 text-white px-4 py-2 text-sm font-medium text-right whitespace-pre-wrap shadow">
          {message.content}
        </p>
      </div>
    </div>
  );
}
