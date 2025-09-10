import React, { useState, useRef } from "react";
import { Download, Palette, Send, User, MessageCircle } from "lucide-react";

const InvitationGenerator = () => {
  const [guestName, setGuestName] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const templates = [
    {
      id: 0,
      name: "Golden Elegance",
      gradient: "from-yellow-400 via-yellow-600 to-yellow-800",
      accent: "text-yellow-300",
      border: "border-yellow-500",
    },
    {
      id: 1,
      name: "Royal Purple",
      gradient: "from-purple-400 via-purple-600 to-purple-800",
      accent: "text-purple-300",
      border: "border-purple-500",
    },
    {
      id: 2,
      name: "Rose Gold",
      gradient: "from-pink-400 via-rose-500 to-orange-500",
      accent: "text-pink-300",
      border: "border-pink-500",
    },
    {
      id: 3,
      name: "Midnight Blue",
      gradient: "from-blue-400 via-blue-600 to-indigo-800",
      accent: "text-blue-300",
      border: "border-blue-500",
    },
  ];

  const sendDiscordNotification = async () => {
    // Use Vite dev server proxy to avoid exposing the webhook and bypass CORS
    const hasWebhook = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    if (!hasWebhook) return;

    try {
      const embed = {
        title: "🎉 New Invitation Created!",
        description: `**${guestName || "Anonymous Guest"}** just created their farewell party invitation!`,
        color: 0xffd700,
        fields: [
          {
            name: "Guest Name",
            value: guestName || "Anonymous",
            inline: true,
          },
          {
            name: "Template",
            value: templates[selectedTemplate].name,
            inline: true,
          },
          {
            name: "Personal Message",
            value: personalMessage || "No message provided",
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Farewell Party Invitation System",
        },
      };

      await fetch("/api/discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Invitation Bot",
          embeds: [embed],
        }),
      });
    } catch (error) {
      console.error("Discord notification failed:", error);
    }
  };

  const handleGenerateCard = async () => {
    setIsGenerating(true);
    setIsFlipped(true);

    // Send Discord notification
    await sendDiscordNotification();

    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const downloadCard = async () => {
    // Generate PNG from the card using html2canvas
    if (!cardRef.current) return;
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${guestName || "Guest"}_Invitation.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <section className="py-20 px-6" id="invitation-generator">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-6">
            Create Your Personal Invitation
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Customize your luxury invitation card and make this farewell
            unforgettable
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <div className="space-y-8">
            {/* Name Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-medium text-white">
                <User className="w-5 h-5" />
                Your Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-medium text-white">
                <MessageCircle className="w-5 h-5" />
                Personal Message (Optional)
              </label>
              <textarea
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                placeholder="Add a personal touch..."
                rows={4}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 focus:outline-none transition-all duration-300 resize-none"
              />
            </div>

            {/* Template Selector */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-lg font-medium text-white">
                <Palette className="w-5 h-5" />
                Choose Template
              </label>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? `${template.border} bg-gradient-to-r ${template.gradient} bg-opacity-20`
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <div
                      className={`w-full h-16 rounded-lg bg-gradient-to-r ${template.gradient} mb-2`}
                    ></div>
                    <span className="text-white font-medium">
                      {template.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleGenerateCard}
                disabled={!guestName.trim() || isGenerating}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isGenerating ? "Generating..." : "Generate Invitation"}
              </button>

              <button
                onClick={downloadCard}
                className="w-full py-4 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Card
              </button>
            </div>
          </div>

          {/* Card Preview */}
          <div className="flex justify-center">
            <div
              ref={cardRef}
              className={`relative w-80 h-96 transition-transform duration-1000 transform-gpu ${
                isFlipped ? "rotateY-180" : ""
              }`}
              style={{ perspective: "1000px" }}
            >
              {/* Card Front */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${
                  templates[selectedTemplate].gradient
                } shadow-2xl backdrop-blur-sm border border-white/20 transform-gpu transition-all duration-500 ${
                  isFlipped ? "rotateY-180 opacity-0" : ""
                }`}
              >
                <div className="p-8 h-full flex flex-col justify-between text-center">
                  <div>
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      You're Invited!
                    </h3>
                    <div className="h-px bg-white/30 w-24 mx-auto mb-4"></div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {guestName || "Your Name Here"}
                    </h4>
                    {personalMessage && (
                      <p className="text-sm text-white/80 italic">
                        "{personalMessage}"
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-lg font-medium text-white">
                      Farewell Celebration
                    </p>
                    <p className="text-sm text-white/80">
                      An Evening to Remember
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Back (Success State) */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 shadow-2xl backdrop-blur-sm border border-white/20 transform-gpu transition-all duration-500 ${
                  isFlipped ? "" : "rotateY-180 opacity-0"
                } flex items-center justify-center`}
              >
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Invitation Created!
                  </h3>
                  <p className="text-white/80">
                    Your personalized invitation is ready
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default InvitationGenerator;
