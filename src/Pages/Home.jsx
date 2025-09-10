import React from "react";
import Hero from "../components/Hero";
import InvitationGenerator from "../components/InvitationGenerator";
import CountdownTimer from "../components/CountdownTimer";
import EventInfo from "../components/EventInfo";
import MemoryWall from "../components/MemoryWall";
import PhotoGallery from "../components/PhotoGallery";
import RSVPSection from "../components/RSVPSection";
import FloatingParticles from "../components/FloatingParticles";
import BackgroundEffects from "../components/BackgroundEffects";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />
      <FloatingParticles />

      {/* Main Content Sections */}
      <Hero />
      <InvitationGenerator />
      <CountdownTimer />
      <EventInfo />
      {/* <PhotoGallery />
      <MemoryWall />
      <RSVPSection /> */}
    </div>
  );
};

export default Home;
