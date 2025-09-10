import React, { useState } from 'react';
import { CheckCircle, Calendar, MapPin, Clock, Users, Send, User, Mail, Phone } from 'lucide-react';

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '1',
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('RSVP Data:', formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        attendance: '',
        guests: '1',
        dietaryRestrictions: '',
        message: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-green-900 via-black to-blue-900 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-xl text-gray-300 mb-6">
              Your RSVP has been received. We're excited to celebrate with you!
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-900 via-black to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Calendar className="w-16 h-16 text-blue-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-6">
            RSVP Now
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let us know if you'll be joining us for this special farewell celebration
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Event Details */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-400" />
                Event Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Date</p>
                    <p className="text-gray-300">Saturday, December 15th, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Time</p>
                    <p className="text-gray-300">6:00 PM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Venue</p>
                    <p className="text-gray-300">College Auditorium, Main Campus</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Dress Code</p>
                    <p className="text-gray-300">Semi-formal / Cocktail attire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RSVP Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Send className="w-6 h-6 text-green-400" />
              Confirm Your Attendance
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Will you be attending? *
                </label>
                <select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300"
                  required
                >
                  <option value="">Please select</option>
                  <option value="yes">Yes, I'll be there!</option>
                  <option value="no">Sorry, can't make it</option>
                  <option value="maybe">Maybe</option>
                </select>
              </div>

              {formData.attendance === 'yes' && (
                <>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Number of Guests (including yourself)
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300"
                    >
                      <option value="1">1 (Just me)</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Dietary Restrictions
                    </label>
                    <input
                      type="text"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      placeholder="Any allergies or dietary preferences?"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-white font-medium mb-2">
                  Special Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any special message or requests?"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
                Send RSVP
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
