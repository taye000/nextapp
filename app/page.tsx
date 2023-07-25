import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Hero/>
      <Features/>
      <Testimonials/>
      <CallToAction/>
    </main>
  );
}
