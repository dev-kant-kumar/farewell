import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  Users,
  Music,
  Camera,
  Gift,
  Car,
  Phone,
  Mail,
  Navigation,
  Thermometer,
} from "lucide-react";

const EventInfo = () => {
  const [activeTab, setActiveTab] = useState("venue");
  const [mapLoaded, setMapLoaded] = useState(false);

  const eventDetails = {
    venue: {
      name: "The Grand Ballroom",
      address: "123 Celebration Avenue, Downtown City",
      capacity: "200 guests",
      features: [
        "Air Conditioned",
        "Parking Available",
        "Accessible",
        "Photography Allowed",
      ],
    },
    schedule: [
      { time: "7:00 PM", event: "Welcome & Reception", icon: Users },
      { time: "7:30 PM", event: "Dinner Service", icon: Gift },
      { time: "8:30 PM", event: "Speeches & Memories", icon: Users },
      { time: "9:00 PM", event: "Music & Dancing", icon: Music },
      { time: "10:30 PM", event: "Photo Session", icon: Camera },
      { time: "11:00 PM", event: "Farewell Toast", icon: Gift },
    ],
    dresscode: {
      theme: "Cocktail Elegant",
      suggestions: [
        "Semi-formal attire",
        "Cocktail dresses",
        "Suit & tie optional",
        "Comfortable dancing shoes",
      ],
      colors: ["Deep blues", "Elegant blacks", "Metallics", "Jewel tones"],
    },
  };

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
    <div
      className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-400/20 rounded-lg">
          <Icon className="w-6 h-6 text-yellow-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <section className="py-20 px-6 relative overflow-hidden" id="event-info">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Event Details
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know for an unforgettable evening
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <TabButton
            id="venue"
            label="Venue & Location"
            icon={MapPin}
            active={activeTab === "venue"}
            onClick={setActiveTab}
          />
          <TabButton
            id="schedule"
            label="Event Schedule"
            icon={Clock}
            active={activeTab === "schedule"}
            onClick={setActiveTab}
          />
          <TabButton
            id="dresscode"
            label="Dress Code"
            icon={Users}
            active={activeTab === "dresscode"}
            onClick={setActiveTab}
          />
          <TabButton
            id="travel"
            label="Travel Info"
            icon={Car}
            active={activeTab === "travel"}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {/* Venue Tab */}
          {activeTab === "venue" && (
            <div className="grid lg:grid-cols-2 gap-8 animate-fadeIn">
              {/* Venue Details */}
              <div className="space-y-6">
                <InfoCard icon={MapPin} title="Venue Information">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                        {eventDetails.venue.name}
                      </h4>
                      <p className="text-gray-300 mb-4">
                        {eventDetails.venue.address}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>Capacity: {eventDetails.venue.capacity}</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-white mb-2">
                        Venue Features:
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {eventDetails.venue.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-300"
                          >
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </InfoCard>

                <InfoCard icon={Phone} title="Contact Information">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">
                        events@grandballroom.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Navigation className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">Get Directions</span>
                    </div>
                  </div>
                </InfoCard>
              </div>

              {/* Interactive Map */}
              <div className="h-96 lg:h-full">
                <InfoCard
                  icon={Navigation}
                  title="Location Map"
                  className="h-full"
                >
                  <div className="relative h-64 lg:h-80 bg-gray-800 rounded-xl overflow-hidden">
                    {!mapLoaded ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => setMapLoaded(true)}
                          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Load Interactive Map
                        </button>
                      </div>
                    ) : (
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059728!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1234567890123"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl"
                      />
                    )}
                  </div>
                </InfoCard>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <div className="animate-fadeIn">
              <InfoCard icon={Clock} title="Event Timeline">
                <div className="space-y-6">
                  {eventDetails.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-6 group hover:bg-white/5 p-4 rounded-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-8 h-8 text-yellow-400" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-400 mb-1">
                            {item.time}
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {item.event}
                          </div>
                        </div>
                      </div>
                      {index < eventDetails.schedule.length - 1 && (
                        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent ml-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </InfoCard>
            </div>
          )}

          {/* Dress Code Tab */}
          {activeTab === "dresscode" && (
            <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
              <InfoCard icon={Users} title="Dress Code Guidelines">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-yellow-400 mb-3">
                      {eventDetails.dresscode.theme}
                    </h4>
                    <div className="space-y-2">
                      {eventDetails.dresscode.suggestions.map(
                        (suggestion, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300">{suggestion}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </InfoCard>

              <InfoCard icon={Thermometer} title="Recommended Colors">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {eventDetails.dresscode.colors.map((color, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div
                          className={`w-12 h-12 mx-auto mb-2 rounded-full ${
                            index === 0
                              ? "bg-blue-600"
                              : index === 1
                              ? "bg-black"
                              : index === 2
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-purple-600 to-pink-600"
                          }`}
                        ></div>
                        <span className="text-sm text-gray-300">{color}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                    <p className="text-yellow-400 text-sm">
                      💡 Tip: Feel free to express your personal style while
                      keeping it elegant and celebration-appropriate!
                    </p>
                  </div>
                </div>
              </InfoCard>
            </div>
          )}

          {/* Travel Info Tab */}
          {activeTab === "travel" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              <InfoCard icon={Car} title="Parking">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Free valet parking</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>200+ parking spots</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>EV charging stations</span>
                  </div>
                </div>
              </InfoCard>

              <InfoCard icon={Navigation} title="Public Transit">
                <div className="space-y-3 text-gray-300">
                  <p>Metro Station: Downtown Central</p>
                  <p>Bus Lines: 15, 23, 42</p>
                  <p>Walking distance: 2 blocks</p>
                </div>
              </InfoCard>

              <InfoCard icon={Phone} title="Ride Sharing">
                <div className="space-y-3 text-gray-300">
                  <p>Drop-off zone available</p>
                  <p>Pickup area designated</p>
                  <p>Estimated wait: 3-5 mins</p>
                </div>
              </InfoCard>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default EventInfo;
