import React, { useState } from 'react';
import { MessageSquare, Heart, Star, Send, User } from 'lucide-react';

const MemoryWall = () => {
  const [newMessage, setNewMessage] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [memories, setMemories] = useState([
    {
      id: 1,
      message: "Thank you for being such an amazing friend throughout our college journey. Your support and laughter made every day brighter!",
      author: "Sarah Johnson",
      timestamp: "2 hours ago",
      likes: 12
    },
    {
      id: 2,
      message: "From late-night study sessions to celebrating our achievements, we've shared so many wonderful moments. Wishing you all the best!",
      author: "Mike Chen",
      timestamp: "5 hours ago",
      likes: 8
    },
    {
      id: 3,
      message: "Your positive energy and determination have always inspired me. Thank you for being such a great classmate and friend!",
      author: "Emily Davis",
      timestamp: "1 day ago",
      likes: 15
    },
    {
      id: 4,
      message: "College wouldn't have been the same without you. Here's to new adventures and staying in touch forever!",
      author: "Alex Rodriguez",
      timestamp: "2 days ago",
      likes: 10
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && newAuthor.trim()) {
      const newMemory = {
        id: memories.length + 1,
        message: newMessage,
        author: newAuthor,
        timestamp: "Just now",
        likes: 0
      };
      setMemories([newMemory, ...memories]);
      setNewMessage('');
      setNewAuthor('');
    }
  };

  const handleLike = (id) => {
    setMemories(memories.map(memory =>
      memory.id === id ? { ...memory, likes: memory.likes + 1 } : memory
    ));
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-900 via-black to-blue-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <MessageSquare className="w-16 h-16 text-purple-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 bg-clip-text text-transparent mb-6">
            Memory Wall
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Share your favorite memories and messages for our farewell celebration
          </p>
        </div>

        {/* Add Memory Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Star className="w-6 h-6 text-yellow-400" />
            Share Your Memory
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Your name"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 focus:outline-none transition-all duration-300"
                required
              />
            </div>
            <div>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your favorite memory or message..."
                rows={4}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
              Share Memory
            </button>
          </form>
        </div>

        {/* Memory Cards */}
        <div className="space-y-6">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-white">{memory.author}</h4>
                    <span className="text-sm text-gray-400">{memory.timestamp}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">{memory.message}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(memory.id)}
                      className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors duration-200"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">{memory.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryWall;
