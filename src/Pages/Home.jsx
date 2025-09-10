import BackgroundEffects from "../components/BackgroundEffects";
import CountdownTimer from "../components/CountdownTimer";
import EventInfo from "../components/EventInfo";
import FloatingParticles from "../components/FloatingParticles";
import Hero from "../components/Hero";
import InvitationGenerator from "../components/InvitationGenerator";

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
      {/* <PhotoGallery /> */}
      {/* <MemoryWall /> */}
      {/* <RSVPSection /> */}
    </div>
  );
};

export default Home;
