"use client";

import { useUserContext } from "@/context/userContext";
import { axiosClient } from "@/lib/axios-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Send, LogOut, Loader2, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const { username, logout } = useUserContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axiosClient.get<Message[]>("/chat/messages");
      setMessages(response.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: username,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axiosClient.post<Message>("/chat/send", message);
      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again later.");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-white to-gray-50">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 fixed w-full top-0 z-10 shadow-xl rounded-b-xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-7 h-7 text-white" />
            <h1 className="text-2xl font-semibold text-white tracking-wide drop-shadow-md">
              Welcome, {username}!
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 pt-28 pb-28 px-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          {isLoading && (
            <div className="flex justify-center items-center space-x-3 text-blue-500 py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-lg font-medium">Loading messages...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-200 text-red-700 p-6 rounded-xl mb-6 border-l-4 border-red-500 shadow-xl font-medium">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-6 rounded-xl ${
                    msg.sender === username
                      ? "bg-blue-100 ml-auto border border-blue-400 shadow-lg"
                      : "bg-gray-200 border border-gray-300 shadow-md"
                  } max-w-[85%] transition-all duration-300 hover:scale-105 transform`}
                >
                  <div className="font-semibold text-base text-blue-600">
                    {msg.sender}
                  </div>
                  <div className="mt-2 text-gray-800 text-lg leading-relaxed">
                    {msg.content}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 flex flex-col items-center space-y-4 py-12">
                <MessageSquare className="w-12 h-12 text-gray-300" />
                <p className="text-xl font-semibold text-gray-700">
                  No messages yet. Start the conversation!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="p-6 bg-white border-t border-gray-200 shadow-md fixed bottom-0 w-full rounded-t-xl">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-4 bg-white border border-gray-300 rounded-xl text-gray-800 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
