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

  // Discord webhook function
  const sendDiscordNotification = async (action, guestName, templateName) => {
    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
    
    // Don't send notification if webhook URL is not configured
    if (!webhookUrl) {
      console.warn('Discord webhook URL not configured in environment variables');
      return;
    }
    
    const embed = {
      title: `🎉 Invitation ${action === 'generated' ? 'Generated' : 'Downloaded'}!`,
      description: `A premium invitation card has been ${action}`,
      color: action === 'generated' ? 0xfbbf24 : 0x10b981, // Golden for generate, Green for download
      fields: [
        {
          name: "👤 Guest Name",
          value: guestName || "Anonymous",
          inline: true
        },
        {
          name: "🎨 Template",
          value: templateName,
          inline: true
        },
        {
          name: "⏰ Time",
          value: new Date().toLocaleString(),
          inline: true
        }
      ],
      thumbnail: {
        url: "https://cdn.discordapp.com/emojis/1234567890123456789.png" // You can replace with actual emoji URL
      },
      footer: {
        text: "Farewell Invitation Generator",
        icon_url: "https://cdn.discordapp.com/emojis/🎊.png"
      }
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });
    } catch (error) {
      console.log('Discord notification failed:', error);
      // Don't break the user experience if webhook fails
    }
  };

  const handleGenerateCard = async () => {
    setIsGenerating(true);
    setIsFlipped(true);
    setAnimationPhase(0);

    // Send Discord notification for card generation
    const currentTemplate = templates[selectedTemplate];
    await sendDiscordNotification('generated', guestName, currentTemplate.name);

    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      // Reset any animations before capture
      setIsFlipped(false);
      setAnimationPhase(0);

      // Wait for animations to settle
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create a clean capture container with proper dimensions
      const captureContainer = document.createElement("div");
      captureContainer.style.position = "absolute";
      captureContainer.style.left = "-9999px";
      captureContainer.style.top = "0";
      captureContainer.style.width = "600px";
      captureContainer.style.height = "800px";
      captureContainer.style.background = "transparent";
      document.body.appendChild(captureContainer);

      // Create simplified card for download
      const currentTemplate = templates[selectedTemplate];

      captureContainer.innerHTML = `
        <div style="
          position: relative;
          width: 600px;
          height: 800px;
          border-radius: 32px;
          overflow: hidden;
          background: linear-gradient(135deg, ${getGradientColors(
            currentTemplate.primary
          )});
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.1);
        ">
          <!-- Background Layer - Matching preview opacity -->
          <div style="
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, ${getGradientColors(
              currentTemplate.bg
            )});
            opacity: 1.0;
          "></div>
          
          <!-- No additional overlays that wash out colors -->

          <!-- Top Border -->
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 12px;
            background: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.6), rgba(255,255,255,0.3));
          "></div>

          <!-- Corner Decorations -->
          <div style="position: absolute; top: 24px; left: 24px; width: 80px; height: 80px; border: 3px solid rgba(255,255,255,0.3); border-radius: 32px 0 32px 0;"></div>
          <div style="position: absolute; top: 24px; right: 24px; width: 80px; height: 80px; border: 3px solid rgba(255,255,255,0.3); border-radius: 0 32px 0 32px;"></div>
          <div style="position: absolute; bottom: 24px; left: 24px; width: 80px; height: 80px; border: 3px solid rgba(255,255,255,0.3); border-radius: 0 32px 0 32px;"></div>
          <div style="position: absolute; bottom: 24px; right: 24px; width: 80px; height: 80px; border: 3px solid rgba(255,255,255,0.3); border-radius: 32px 0 32px 0;"></div>

          <!-- Content -->
          <div style="
            position: relative;
            z-index: 10;
            padding: 40px;
            height: 100%;
            display: flex;
            flex-direction: column;
            text-align: center;
            color: white;
            font-family: system-ui, -apple-system, sans-serif;
          ">
            <!-- Header - Fixed -->
            <div style="flex-shrink: 0; margin-bottom: 24px;">
              <div style="display: flex; justify-content: center; margin-bottom: 24px;">
                <div style="
                  width: 100px;
                  height: 100px;
                  background: rgba(255,255,255,0.2);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 3px solid rgba(255,255,255,0.3);
                  position: relative;
                  font-size: 40px;
                ">
                  🎉
                  <div style="
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(45deg, #fbbf24, #f97316);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                  ">✨</div>
                </div>
              </div>

              <h3 style="font-size: 40px; font-weight: 900; margin-bottom: 16px; letter-spacing: 2px;">YOU'RE INVITED</h3>
              <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 24px;">
                <div style="height: 2px; background: rgba(255,255,255,0.4); flex: 1;"></div>
                <span style="font-size: 24px;">👑</span>
                <div style="height: 2px; background: rgba(255,255,255,0.4); flex: 1;"></div>
              </div>
            </div>

            <!-- Guest Name - Flexible -->
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 20px 0;">
              <h4 style="
                font-size: 28px;
                font-weight: 900;
                margin-bottom: 16px;
                word-wrap: break-word;
                line-height: 1.3;
                text-align: center;
                color: white;
              ">${guestName || "Your Name Here"}</h4>
              <div style="width: 160px; height: 4px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent); margin: 0 auto;"></div>

              ${
                personalMessage
                  ? `
                <div style="
                  background: rgba(255,255,255,0.1);
                  border-radius: 16px;
                  padding: 20px;
                  border: 2px solid rgba(255,255,255,0.2);
                  margin-top: 24px;
                  margin-left: 16px;
                  margin-right: 16px;
                ">
                  <p style="font-size: 16px; font-style: italic; line-height: 1.4; margin: 0; text-align: center; color: rgba(255,255,255,0.9);">${
                    personalMessage.length > 100
                      ? `"${personalMessage.substring(0, 100)}..."`
                      : `"${personalMessage}"`
                  }</p>
                </div>
              `
                  : ""
              }
            </div>

            <!-- Event Details - Fixed -->
            <div style="flex-shrink: 0;">
              <div style="
                background: rgba(255,255,255,0.15);
                border-radius: 20px;
                padding: 24px;
                border: 2px solid rgba(255,255,255,0.2);
                margin-bottom: 20px;
              ">
                <h5 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                  🎁 FAREWELL CELEBRATION
                </h5>
                <p style="font-size: 16px; opacity: 0.8; margin: 0;">An Evening of Memories & New Beginnings</p>
              </div>

              <div style="
                font-size: 14px;
                opacity: 0.6;
                background: rgba(0,0,0,0.2);
                border-radius: 12px;
                padding: 12px;
                border: 1px solid rgba(255,255,255,0.1);
              ">
                <p style="margin: 0; font-weight: 500;">🎓 Hosted by BCA (2023-25) for BCA (2022-25)</p>
              </div>
            </div>
          </div>
        </div>
      `;

      // Import and use html2canvas with updated settings
      const { default: html2canvas } = await import("html2canvas");

      const canvas = await html2canvas(captureContainer, {
        backgroundColor: null,
        scale: 3, // Increased for ultra HD quality
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        logging: false,
        width: 600,
        height: 800,
        onclone: (clonedDoc) => {
          // Add antialiasing for smoother text
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
          `;
          clonedDoc.head.appendChild(style);
        },
      });

      // Clean up
      document.body.removeChild(captureContainer);

      // Download
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `${guestName || "Guest"}_Premium_Invitation.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Send Discord notification for download
      await sendDiscordNotification('downloaded', guestName, currentTemplate.name);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download invitation. Please try again.");
    }
  };

  // Helper function to convert Tailwind gradients to CSS
  const getGradientColors = (tailwindGradient) => {
    const gradientMap = {
      "from-yellow-300 via-yellow-500 to-yellow-700":
        "#fde047, #eab308, #a16207",
      "from-gray-200 via-gray-400 to-gray-600": "#e5e7eb, #9ca3af, #4b5563",
      "from-pink-300 via-rose-400 to-pink-600": "#f9a8d4, #fb7185, #db2777",
      "from-blue-300 via-blue-500 to-indigo-700": "#93c5fd, #3b82f6, #4338ca",
      "from-green-300 via-emerald-500 to-green-700":
        "#86efac, #10b981, #15803d",
      "from-purple-300 via-purple-500 to-violet-700":
        "#d8b4fe, #8b5cf6, #6d28d9",
      // More vibrant background gradients to match preview
      "from-yellow-900/20 via-yellow-800/30 to-orange-900/20":
        "rgba(113, 63, 18, 0.4), rgba(146, 64, 14, 0.5), rgba(124, 45, 18, 0.4)",
      "from-gray-900/20 via-gray-800/30 to-gray-700/20":
        "rgba(17, 24, 39, 0.4), rgba(31, 41, 55, 0.5), rgba(55, 65, 81, 0.4)",
      "from-pink-900/20 via-rose-800/30 to-pink-700/20":
        "rgba(131, 24, 67, 0.4), rgba(159, 18, 57, 0.5), rgba(190, 24, 93, 0.4)",
      "from-blue-900/20 via-indigo-800/30 to-blue-700/20":
        "rgba(30, 58, 138, 0.4), rgba(55, 48, 163, 0.5), rgba(29, 78, 216, 0.4)",
      "from-green-900/20 via-emerald-800/30 to-green-700/20":
        "rgba(20, 83, 45, 0.4), rgba(6, 95, 70, 0.5), rgba(21, 128, 61, 0.4)",
      "from-purple-900/20 via-violet-800/30 to-purple-700/20":
        "rgba(88, 28, 135, 0.4), rgba(91, 33, 182, 0.5), rgba(109, 40, 217, 0.4)",
    };
    return gradientMap[tailwindGradient] || "#3b82f6, #8b5cf6, #ec4899";
  };

  const currentTemplate = templates[selectedTemplate];
  const TemplateIcon = currentTemplate.icon;

  return (
    <div
      id="invitation-generator"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <section className="py-10 md:py-20 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="relative mb-10 md:mb-16">
            {/* Premium halo/aurora */}
            <div className="pointer-events-none absolute -inset-10 md:-inset-16 opacity-70">
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(250,204,21,0.25),transparent_60%)]"></div>
              <div className="absolute inset-0 aurora-mask"></div>
            </div>

            <div className="relative text-center">
              {/* Shimmering crown label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-amber-300 font-semibold shadow-[0_0_30px_rgba(251,191,36,0.25)] mb-4">
                <span className="text-lg">👑</span>
                <span className="uppercase tracking-widest text-xs md:text-sm">Elite Designer Suite</span>
              </div>

              {/* Headline */}
              <h1 className="relative inline-block text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1]">
                <span className="bg-gradient-to-r from-amber-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_6px_30px_rgba(168,85,247,0.35)]">
                  Ultra Premium Invitations
                </span>
                <span className="absolute inset-x-0 -bottom-1 h-[2px] shimmer-line"></span>
              </h1>

              {/* Subheading */}
              <p className="mt-5 md:mt-6 text-base md:text-xl text-white/80 max-w-3xl mx-auto px-6">
                Design studio–grade cards with cinematic gradients, luxury textures, and razor‑sharp typography. Export in crystal‑clear Ultra HD.
              </p>

              {/* Feature chips */}
              <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <span className="chip">4K Export</span>
                <span className="chip">Pro Typography</span>
                <span className="chip">Luxury Palettes</span>
                <span className="chip">Real‑time Preview</span>
              </div>

              {/* CTA */}
              <div className="mt-8 md:mt-10 flex items-center justify-center gap-3 md:gap-4">
                <button onClick={handleGenerateCard} disabled={!guestName.trim() || isGenerating} className="cta-primary">
                  <span className="relative z-10 flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Generate Premium Card
                  </span>
                </button>
                <button onClick={downloadCard} className="cta-secondary">
                  <Download className="w-5 h-5" />
                  Download Ultra HD
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Controls */}
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
              {/* Name Input */}
              <div className="space-y-3 md:space-y-4">
                <label className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-white">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                  Guest Name
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter the guest's name"
                  className="w-full px-4 md:px-8 py-4 md:py-6 bg-gradient-to-r from-white/10 to-white/5 border-2 border-white/20 rounded-xl md:rounded-2xl text-white placeholder-gray-400 backdrop-blur-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30 focus:outline-none transition-all duration-500 text-base md:text-lg font-medium"
                />
              </div>

              {/* Template Selector */}
              <div className="space-y-4 md:space-y-6">
                <label className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-white">
                  <Palette className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
                  Premium Templates
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {templates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`group relative p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${
                          selectedTemplate === template.id
                            ? `${template.border} bg-gradient-to-br ${template.bg} shadow-2xl shadow-${template.particles}/20`
                            : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`w-full h-16 md:h-20 rounded-lg md:rounded-xl bg-gradient-to-r ${template.primary} mb-3 md:mb-4 relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                          <div className="absolute top-2 right-2">
                            <Icon className="w-6 h-6 text-white/80" />
                          </div>
                        </div>
                        <span
                          className={`font-bold text-xs md:text-sm ${
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
                <div className="space-y-3 md:space-y-4">
                  <label className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-white">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    Personal Message
                  </label>
                  <div className="p-4 md:p-6 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl md:rounded-2xl backdrop-blur-xl">
                    <p className="text-white/90 italic text-base md:text-lg leading-relaxed">
                      "{personalMessage}"
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4 md:space-y-6">
                <button
                  onClick={handleGenerateCard}
                  disabled={!guestName.trim() || isGenerating}
                  className="w-full py-4 md:py-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-black text-lg md:text-xl rounded-xl md:rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-500 flex items-center justify-center gap-3 md:gap-4 shadow-2xl shadow-yellow-500/20 cursor-pointer"
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                  {isGenerating ? "Creating Magic..." : "Generate Premium Card"}
                </button>

                <button
                  onClick={downloadCard}
                  className="w-full py-4 md:py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base md:text-lg rounded-xl md:rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-500 flex items-center justify-center gap-3 md:gap-4 shadow-2xl shadow-purple-500/20 transform hover:scale-105 cursor-pointer"
                >
                  <Download className="w-5 h-5 md:w-6 md:h-6" />
                  Download Ultra HD
                </button>
              </div>
            </div>

            {/* Card Preview */}
            <div className="flex justify-center mt-8 lg:mt-0 order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-3xl">
                <div
                  ref={cardRef}
                  className={`relative w-80 h-[32rem] sm:w-96 sm:h-[36rem] md:w-[400px] md:h-[500px] transition-all duration-1000 transform-gpu ${
                    isFlipped ? "scale-105" : "hover:scale-105"
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
                    <div className="relative z-10 p-6 h-full flex flex-col text-center">
                      {/* Header - Fixed Height */}
                      <div className="flex-shrink-0 mb-4">
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                              <PartyPopper className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Sparkles className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-2 tracking-wide">
                          YOU'RE INVITED
                        </h3>
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <div className="h-px bg-white/40 flex-1"></div>
                          <TemplateIcon className="w-5 h-5 text-white/60" />
                          <div className="h-px bg-white/40 flex-1"></div>
                        </div>
                      </div>

                      {/* Guest Info - Flexible Height */}
                      <div className="flex flex-col justify-center min-h-0 py-4 flex-1">
                        <div className="space-y-4">
                          <h4 className="text-xl md:text-2xl font-bold text-white break-words leading-tight px-2 text-center">
                            {guestName || "Muskan"}
                          </h4>
                          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
                        </div>

                        {personalMessage && (
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 mx-2 mt-4">
                            <p className="text-sm text-white/90 italic leading-relaxed break-words text-center">
                              "{personalMessage.length > 80 ? `${personalMessage.substring(0, 80)}...` : personalMessage}"
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Event Details - Fixed Height */}
                      <div className="flex-shrink-0 space-y-3">
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <h5 className="text-lg font-bold text-white mb-1 flex items-center justify-center gap-2">
                            <Gift className="w-4 h-4" />
                            FAREWELL CELEBRATION
                          </h5>
                          <p className="text-white/80 text-xs">
                            An Evening of Memories & New Beginnings
                          </p>
                        </div>

                        {/* Party Info */}
                        <div className="text-xs text-white/60 bg-black/20 rounded-lg p-2 backdrop-blur-sm border border-white/10">
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

        /* Premium hero effects */
        .aurora-mask {
          background: conic-gradient(from 180deg at 50% 50%, rgba(168,85,247,0.18), rgba(59,130,246,0.18), rgba(236,72,153,0.18), rgba(250,204,21,0.18), rgba(168,85,247,0.18));
          filter: blur(60px);
          border-radius: 40px;
          mask-image: radial-gradient(60% 60% at 50% 40%, #000 60%, transparent 100%);
        }
        .shimmer-line {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          animation: shimmer 2.4s ease-in-out infinite;
          border-radius: 999px;
        }
        @keyframes shimmer {
          0% { transform: translateX(-40%); opacity: .0; }
          35% { opacity: .8; }
          70% { opacity: .0; }
          100% { transform: translateX(40%); opacity: .0; }
        }

        /* Chips and CTAs (Tailwind-compatible with utility classes) */
        :global(.chip) {
          @apply px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 text-xs md:text-sm backdrop-blur-xl;
        }
        :global(.cta-primary) {
          @apply relative overflow-hidden px-5 md:px-6 py-3 md:py-4 rounded-2xl font-extrabold text-black bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 shadow-[0_10px_35px_-10px_rgba(251,191,36,0.45)] disabled:opacity-60 disabled:cursor-not-allowed;
        }
        :global(.cta-primary::before) {
          content: '';
          position: absolute; inset: 0; background: radial-gradient(120% 120% at -10% -10%, rgba(255,255,255,.6), transparent 40%), radial-gradient(120% 120% at 120% 120%, rgba(255,255,255,.4), transparent 40%);
          opacity: .4; pointer-events: none;
        }
        :global(.cta-secondary) {
          @apply px-5 md:px-6 py-3 md:py-4 rounded-2xl font-bold text-white border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition;
        }
      `}</style>
    </div>
  );
};

export default InvitationGenerator;
