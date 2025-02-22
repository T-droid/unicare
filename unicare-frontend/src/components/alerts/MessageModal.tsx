import React from "react";
import { MessageProps } from "@/state/app";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";

interface MessageModalProps extends MessageProps {
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  message,
  type,
  onClose,
}) => {
  setTimeout(() => {
    onClose();
  }, 3000);
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-center">
      <div
        className={`
        relative flex items-center justify-between p-4 w-96 rounded-lg mt-4 border shadow-lg gap-4
        ${
          type === "error"
            ? "bg-red-100 border-red-500"
            : type === "success"
            ? "bg-green-100 border-green-500"
            : type === "warning"
            ? "bg-yellow-100 border-yellow-500"
            : type === "info"
            ? "bg-blue-100 border-blue-500"
            : "bg-gray-100 border-gray-500"
        }
        `}
      >
        <div className="flex gap-2 items-center w-full">
          {type === "error" ? (
            <AlertCircle className="min-h-6 min-w-6 text-red-400" />
          ) : type === "success" ? (
            <CheckCircle2 className="min-h-6 min-w-6 text-green-500" />
          ) : type === "warning" ? (
            <TriangleAlert className="min-h-6 min-w-6 text-yellow-500" />
          ) : type === "info" ? (
            <Info className="min-h-6 min-w-6 text-blue-500" />
          ) : null}
          <p className="text-black">{message}</p>
        </div>

        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
