import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ChatAdmin() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ปุ่มกลม */}
      <a href="https://line.me" target="_blank" rel="noopener noreferrer">
      <button
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition">
        <MessageCircle className="w-6 h-6" />
      </button>
      </a>
    </div>
  );
}
