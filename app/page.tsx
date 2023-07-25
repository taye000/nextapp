import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero/>
      <Features/>
      <Testimonials/>
    </main>
  );
}
