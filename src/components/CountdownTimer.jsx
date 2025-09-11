import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventDay, setIsEventDay] = useState(false);

  // Calculate today at 12 PM (noon)
  const getEventDate = () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0); // Set to 12:00:00 PM (noon)
    return today;
  };

  const [eventDate] = useState(() => getEventDate());

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const eventTime = eventDate.getTime();
      const difference = eventTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setIsEventDay(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []); // Removed dependencies to prevent infinite re-renders

  const TimeCard = ({ value, label }) => {
    return (
      <div className="relative w-full">
        <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20 shadow-2xl min-h-[120px] lg:min-h-[140px] flex flex-col justify-center">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-xl lg:rounded-2xl blur-xl opacity-75"></div>

          <div className="relative z-10">
            {/* Number */}
            <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center mb-2 text-white will-change-contents">
              {String(value).padStart(2, "0")}
            </div>

            {/* Label */}
            <div className="text-center text-xs sm:text-sm lg:text-base font-medium text-gray-300 uppercase tracking-wider">
              {label}
            </div>

            {/* Separator dots */}
            {label !== "Seconds" && (
              <div className="absolute -right-2 lg:-right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="flex flex-col space-y-1">
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reflection effect - only show on larger screens to reduce complexity */}
        <div className="absolute inset-x-0 -bottom-6 h-6 bg-gradient-to-br from-white/10 to-transparent rounded-xl lg:rounded-2xl blur-sm opacity-50 transform scale-y-[-1] hidden lg:block"></div>
      </div>
    );
  };

  if (isEventDay) {
    return (
      <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 min-h-screen" id="countdown">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-3xl animate-pulse delay-2000 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Celebration Animation */}
          <div className="mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="text-6xl animate-bounce delay-0">🎉</div>
              <div className="text-6xl animate-bounce delay-100">🎊</div>
              <div className="text-6xl animate-bounce delay-200">🥳</div>
              <div className="text-6xl animate-bounce delay-300">🎉</div>
            </div>
            <div className="relative inline-block">
              <div className="text-8xl animate-pulse">🔥</div>
              <div className="absolute inset-0 animate-ping">
                <div className="text-8xl opacity-75">✨</div>
              </div>
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
            PARTY IS LIVE! 🔴
          </h2>
          
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-400/30 shadow-2xl mb-8">
            <p className="text-3xl font-bold text-white mb-2">🎪 THE FAREWELL PARTY IS HAPPENING NOW! 🎪</p>
            <p className="text-xl text-gray-200">Join us for an amazing celebration! 🚀</p>
          </div>

          <div className="flex justify-center items-center gap-6 text-2xl">
            <span className="animate-pulse">🎵</span>
            <span className="text-white font-semibold">Music Playing</span>
            <span className="animate-pulse">💃</span>
            <span className="text-white font-semibold">People Dancing</span>
            <span className="animate-pulse">🍰</span>
            <span className="text-white font-semibold">Food Served</span>
            <span className="animate-pulse">📸</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen"
      id="countdown"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-3xl animate-pulse delay-2000 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-yellow-400 animate-spin" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              Countdown to Party Time
            </h2>
            <Clock className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Every second counts until 12:00 PM today
          </p>
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12">
          <TimeCard
            value={timeLeft.days}
            label="Days"
          />
          <TimeCard
            value={timeLeft.hours}
            label="Hours"
          />
          <TimeCard
            value={timeLeft.minutes}
            label="Minutes"
          />
          <TimeCard
            value={timeLeft.seconds}
            label="Seconds"
          />
        </div>

        {/* Event Quick Info */}
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Calendar className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Date</h3>
              <p className="text-gray-300">
                {eventDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-pink-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Time</h3>
              <p className="text-gray-300">
                {eventDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Event</h3>
              <p className="text-gray-300">Today at 12 PM</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12">
          <div className="bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-1000 ease-out relative"
              style={{
                width: `${Math.max(
                  0,
                  Math.min(
                    100,
                    ((new Date().getTime() -
                      (eventDate.getTime() - 24 * 60 * 60 * 1000)) /
                      (24 * 60 * 60 * 1000)) *
                      100
                  )
                )}%`,
              }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Progress to Today 12 PM
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
