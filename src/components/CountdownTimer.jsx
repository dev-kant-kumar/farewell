import { Calendar, Clock, MapPin, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventDay, setIsEventDay] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioContextInitialized, setAudioContextInitialized] = useState(false);
  const [previousSeconds, setPreviousSeconds] = useState(-1);
  const celebrationPlayedRef = useRef(false);
  const audioContextRef = useRef(null);

  // Initialize audio context on first user interaction
  const initializeAudio = async () => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        // Resume the context if it's suspended
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        setAudioContextInitialized(true);
        console.log('Audio context initialized successfully');
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
      }
    }
  };

  // Sound effects using Web Audio API
  const playTick = async () => {
    if (!soundEnabled) return;
    
    try {
      await initializeAudio();
      if (!audioContextRef.current) return;
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.2);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.2);
    } catch (error) {
      console.error('Failed to play tick sound:', error);
    }
  };

  const playUrgentTick = async () => {
    if (!soundEnabled) return;
    
    try {
      await initializeAudio();
      if (!audioContextRef.current) return;
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(1200, audioContextRef.current.currentTime);
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.4, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.25);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + 0.25);
    } catch (error) {
      console.error('Failed to play urgent tick sound:', error);
    }
  };

  const playCelebration = async () => {
    if (!soundEnabled || celebrationPlayedRef.current) return;
    celebrationPlayedRef.current = true;
    
    try {
      await initializeAudio();
      if (!audioContextRef.current) return;
      
      // Play a series of celebration notes
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContextRef.current.currentTime + index * 0.3);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime + index * 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + index * 0.3 + 0.4);
        
        oscillator.start(audioContextRef.current.currentTime + index * 0.3);
        oscillator.stop(audioContextRef.current.currentTime + index * 0.3 + 0.4);
      });
    } catch (error) {
      console.error('Failed to play celebration sound:', error);
    }
  };

  // Test sound function
  const playTestSound = async () => {
    await initializeAudio();
    playTick();
  };

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

        // Play sounds based on countdown state
        if (previousSeconds !== seconds) {
          const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
          
          if (totalSeconds <= 10 && totalSeconds > 0) {
            // Urgent ticking for last 10 seconds
            playUrgentTick();
          } else if (totalSeconds <= 60) {
            // Normal tick for last minute
            playTick();
          }
          
          setPreviousSeconds(seconds);
        }

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Play celebration sound when event starts
        if (!isEventDay) {
          playCelebration();
        }
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
      <div className="relative">
        <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-2xl blur-xl opacity-75"></div>

          <div className="relative z-10">
            {/* Number */}
            <div className="text-5xl md:text-7xl font-bold text-center mb-2 text-white transition-colors duration-300">
              {String(value).padStart(2, "0")}
            </div>

            {/* Label */}
            <div className="text-center text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">
              {label}
            </div>

            {/* Separator dots */}
            {label !== "Seconds" && (
              <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block">
                <div className="flex flex-col space-y-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reflection effect */}
        <div className="absolute inset-x-0 -bottom-6 h-6 bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-sm opacity-50 transform scale-y-[-1]"></div>
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
        <div className="text-center mb-16 relative">
          {/* Sound Controls */}
          <div className="absolute top-0 right-0 flex gap-2">
            {/* Test Sound Button */}
            <button
              onClick={playTestSound}
              className="p-3 rounded-full transition-all duration-300 border-2 bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30 backdrop-blur-sm hover:scale-110"
              title="Test Sound (Click to activate audio)"
            >
              <span className="text-sm font-bold">♪</span>
            </button>
            
            {/* Sound Toggle Button */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-full transition-all duration-300 border-2 ${
                soundEnabled
                  ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30"
                  : "bg-gray-500/20 border-gray-500/30 text-gray-400 hover:bg-gray-500/30"
              } backdrop-blur-sm hover:scale-110`}
              title={soundEnabled ? "Disable Sound" : "Enable Sound"}
            >
              {soundEnabled ? (
                <Volume2 className="w-6 h-6" />
              ) : (
                <VolumeX className="w-6 h-6" />
              )}
            </button>
          </div>
          
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
          
          {/* Sound Status Indicator */}
          {soundEnabled && (
            <div className="mt-4">
              <p className="text-sm text-yellow-400 opacity-75">
                🔊 Sound effects enabled - Listen for countdown ticks!
              </p>
            </div>
          )}
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
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
