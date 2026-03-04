import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-[-3]" />
      <div className="fixed top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-accent-violet/8 blur-[120px] pointer-events-none z-[-2] animate-float-glow" />
      <div className="fixed bottom-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-neon-cyan/6 blur-[120px] pointer-events-none z-[-2] animate-float-glow [animation-delay:-5s]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-neon-purple/6 blur-[120px] pointer-events-none z-[-2] animate-float-glow [animation-delay:-10s]" />

      <Navbar />
      <Hero />
      <About />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
