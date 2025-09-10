import {
  Crown,
  Diamond,
  Download,
  Gift,
  Heart,
  MessageCircle,
  Palette,
  PartyPopper,
  Send,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const InvitationGenerator = () => {
  const [guestName, setGuestName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [personalMessage, setPersonalMessage] = useState("");
  const [animationPhase, setAnimationPhase] = useState(0);
  const cardRef = useRef(null);

  const boyMessages = [
    "Ready to make some unforgettable memories, legend!",
    "Time to celebrate like the king you are!",
    "Let's party like there's no tomorrow, champ!",
    "Your presence will make this night absolutely epic!",
    "Get ready for an adventure you'll never forget!",
    "The party won't be complete without our superstar!",
    "Time to show everyone how legends celebrate!",
    "Ready to create some incredible memories, bro?",
    "Let's make this the most amazing night ever!",
    "Your energy is exactly what we need for this party!",
    "Time to celebrate in true champion style!",
    "Get ready for a night full of surprises and fun!",
    "The celebration begins when you arrive, hero!",
    "Let's make this farewell absolutely unforgettable!",
    "Your presence will light up the entire party!",
  ];

  const girlMessages = [
    "Ready to sparkle and shine at our fabulous party?",
    "Time to celebrate like the queen you are!",
    "Let's create magical memories together, princess!",
    "Your radiance will make this night absolutely perfect!",
    "Get ready for a dreamy celebration, beautiful!",
    "The party will be incomplete without our shining star!",
    "Time to celebrate in true royal fashion!",
    "Ready to make some enchanting memories, gorgeous?",
    "Let's make this the most glamorous night ever!",
    "Your grace and charm are exactly what we need!",
    "Time to celebrate with elegance and style!",
    "Get ready for a night full of wonder and joy!",
    "The celebration begins when our angel arrives!",
    "Let's make this farewell absolutely magical!",
    "Your presence will add sparkle to our special night!",
  ];

  const templates = [
    {
      id: 0,
      name: "Golden Royalty",
      primary: "from-yellow-300 via-yellow-500 to-yellow-700",
      secondary: "from-yellow-400 to-orange-500",
      accent: "text-yellow-200",
      border: "border-yellow-400",
      bg: "from-yellow-900/20 via-yellow-800/30 to-orange-900/20",
      icon: Crown,
      particles: "golden",
    },
    {
      id: 1,
      name: "Diamond Luxury",
      primary: "from-gray-200 via-gray-400 to-gray-600",
      secondary: "from-gray-300 to-gray-500",
      accent: "text-gray-100",
      border: "border-gray-300",
      bg: "from-gray-900/20 via-gray-800/30 to-gray-700/20",
      icon: Diamond,
      particles: "silver",
    },
    {
      id: 2,
      name: "Rose Platinum",
      primary: "from-pink-300 via-rose-400 to-pink-600",
      secondary: "from-pink-400 to-rose-500",
      accent: "text-pink-200",
      border: "border-pink-400",
      bg: "from-pink-900/20 via-rose-800/30 to-pink-700/20",
      icon: Heart,
      particles: "rose",
    },
    {
      id: 3,
      name: "Sapphire Elite",
      primary: "from-blue-300 via-blue-500 to-indigo-700",
      secondary: "from-blue-400 to-indigo-600",
      accent: "text-blue-200",
      border: "border-blue-400",
      bg: "from-blue-900/20 via-indigo-800/30 to-blue-700/20",
      icon: Star,
      particles: "blue",
    },
    {
      id: 4,
      name: "Emerald Prestige",
      primary: "from-green-300 via-emerald-500 to-green-700",
      secondary: "from-green-400 to-emerald-600",
      accent: "text-green-200",
      border: "border-green-400",
      bg: "from-green-900/20 via-emerald-800/30 to-green-700/20",
      icon: Sparkles,
      particles: "green",
    },
    {
      id: 5,
      name: "Amethyst Royal",
      primary: "from-purple-300 via-purple-500 to-violet-700",
      secondary: "from-purple-400 to-violet-600",
      accent: "text-purple-200",
      border: "border-purple-400",
      bg: "from-purple-900/20 via-violet-800/30 to-purple-700/20",
      icon: Crown,
      particles: "purple",
    },
  ];

  const getRandomMessage = (name) => {
    if (!name) return "";

    // Simple heuristic to determine if name sounds more feminine
    const feminineEndings = ["a", "i", "e", "ya", "ia", "na", "ra", "la"];
    const feminineNames = [
      "priya",
      "sneha",
      "muskan",
      "sriyanshi",
      "pooja",
      "kavya",
      "ananya",
      "riya",
      "shreya",
      "nikita",
    ];

    const lowerName = name.toLowerCase();
    const isFeminine =
      feminineEndings.some((ending) => lowerName.endsWith(ending)) ||
      feminineNames.some((femName) => lowerName.includes(femName));

    const messages = isFeminine ? girlMessages : boyMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    if (guestName && !personalMessage) {
      setPersonalMessage(getRandomMessage(guestName));
    }
  }, [guestName]);

  useEffect(() => {
    if (isFlipped) {
      const timer1 = setTimeout(() => setAnimationPhase(1), 500);
      const timer2 = setTimeout(() => setAnimationPhase(2), 1000);
      const timer3 = setTimeout(() => setAnimationPhase(3), 1500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isFlipped]);

  const handleGenerateCard = async () => {
    setIsGenerating(true);
    setIsFlipped(true);
    setAnimationPhase(0);

    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
      });
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `${guestName || "Guest"}_Premium_Invitation.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const currentTemplate = templates[selectedTemplate];
  const TemplateIcon = currentTemplate.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-7xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
              ULTRA PREMIUM
            </h1>
            <h2 className="text-4xl font-bold text-white mb-4">
              Invitation Designer
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create breathtaking, luxury invitation cards with Canva-level
              design quality
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Controls */}
            <div className="space-y-8">
              {/* Name Input */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-white">
                  <User className="w-6 h-6 text-yellow-400" />
                  Guest Name
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter the guest's name"
                  className="w-full px-8 py-6 bg-gradient-to-r from-white/10 to-white/5 border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 backdrop-blur-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30 focus:outline-none transition-all duration-500 text-lg font-medium"
                />
              </div>

              {/* Template Selector */}
              <div className="space-y-6">
                <label className="flex items-center gap-3 text-xl font-bold text-white">
                  <Palette className="w-6 h-6 text-pink-400" />
                  Premium Templates
                </label>
                <div className="grid grid-cols-2 gap-6">
                  {templates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${
                          selectedTemplate === template.id
                            ? `${template.border} bg-gradient-to-br ${template.bg} shadow-2xl shadow-${template.particles}/20`
                            : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`w-full h-20 rounded-xl bg-gradient-to-r ${template.primary} mb-4 relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                          <div className="absolute top-2 right-2">
                            <Icon className="w-6 h-6 text-white/80" />
                          </div>
                        </div>
                        <span
                          className={`font-bold text-sm ${
                            selectedTemplate === template.id
                              ? template.accent
                              : "text-white"
                          }`}
                        >
                          {template.name}
                        </span>
                        {selectedTemplate === template.id && (
                          <div className="absolute -top-2 -right-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Message Display */}
              {personalMessage && (
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-xl font-bold text-white">
                    <MessageCircle className="w-6 h-6 text-green-400" />
                    Personal Message
                  </label>
                  <div className="p-6 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl backdrop-blur-xl">
                    <p className="text-white/90 italic text-lg leading-relaxed">
                      "{personalMessage}"
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-6">
                <button
                  onClick={handleGenerateCard}
                  disabled={!guestName.trim() || isGenerating}
                  className="w-full py-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-black text-xl rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl shadow-yellow-500/20"
                >
                  <Send className="w-6 h-6" />
                  {isGenerating ? "Creating Magic..." : "Generate Premium Card"}
                </button>

                <button
                  onClick={downloadCard}
                  className="w-full py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl shadow-purple-500/20 transform hover:scale-105"
                >
                  <Download className="w-6 h-6" />
                  Download Ultra HD
                </button>
              </div>
            </div>

            {/* Card Preview */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  ref={cardRef}
                  className={`relative w-96 h-[32rem] transition-all duration-1000 transform-gpu ${
                    isFlipped ? "scale-110" : "hover:scale-105"
                  }`}
                  style={{ perspective: "1500px" }}
                >
                  {/* Main Card */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl transform-gpu transition-all duration-1000 ${
                      isFlipped ? "rotateY-180 opacity-0" : ""
                    }`}
                  >
                    {/* Card Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${currentTemplate.primary} opacity-90`}
                    ></div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-tl ${currentTemplate.bg} backdrop-blur-sm`}
                    ></div>

                    {/* Decorative Elements */}
                    <div className="absolute inset-0">
                      {/* Top decorative border */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-white/30 via-white/60 to-white/30"></div>

                      {/* Corner decorations */}
                      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-tl-3xl rounded-br-3xl"></div>
                      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-tr-3xl rounded-bl-3xl"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/30 rounded-bl-3xl rounded-tr-3xl"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white/30 rounded-br-3xl rounded-tl-3xl"></div>

                      {/* Center decorative pattern */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10">
                        <TemplateIcon className="w-full h-full text-white" />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between text-center">
                      {/* Header */}
                      <div>
                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                              <PartyPopper className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                          YOU'RE INVITED
                        </h3>
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="h-px bg-white/40 flex-1"></div>
                          <TemplateIcon className="w-6 h-6 text-white/60" />
                          <div className="h-px bg-white/40 flex-1"></div>
                        </div>
                      </div>

                      {/* Guest Info */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-2">
                            {guestName || "Your Name Here"}
                          </h4>
                          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
                        </div>

                        {personalMessage && (
                          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                            <p className="text-sm text-white/90 italic leading-relaxed">
                              "{personalMessage}"
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Event Details */}
                      <div className="space-y-4">
                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                          <h5 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                            <Gift className="w-5 h-5" />
                            FAREWELL CELEBRATION
                          </h5>
                          <p className="text-white/80 text-sm">
                            An Evening of Memories & New Beginnings
                          </p>
                        </div>

                        {/* Party Info */}
                        <div className="text-xs text-white/60 bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                          <p className="font-medium">
                            🎓 Hosted by BCA (2023-25) for BCA (2022-25)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Success Animation */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 shadow-2xl transform-gpu transition-all duration-1000 ${
                      isFlipped ? "" : "rotateY-180 opacity-0"
                    } flex items-center justify-center overflow-hidden`}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0">
                      <div
                        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-300/20 to-purple-500/20 transition-opacity duration-1000 ${
                          animationPhase >= 1 ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                          animationPhase >= 2
                            ? "scale-100 opacity-100"
                            : "scale-150 opacity-0"
                        }`}
                      >
                        <div className="w-40 h-40 border-4 border-white/20 rounded-full animate-spin"></div>
                      </div>
                    </div>

                    <div
                      className={`text-center text-white z-10 transition-all duration-1000 ${
                        animationPhase >= 3
                          ? "scale-100 opacity-100"
                          : "scale-50 opacity-0"
                      }`}
                    >
                      <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm animate-bounce">
                        <Sparkles className="w-12 h-12" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">Card Created!</h3>
                      <p className="text-white/90 text-lg">
                        Your premium invitation is ready to download
                      </p>
                      <div className="flex justify-center gap-2 mt-4">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .rotateY-180 {
          transform: rotateY(180deg);
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InvitationGenerator;
