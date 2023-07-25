import Hero from "./components/Hero";
import Forms from "./components/Forms";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero/>
      <Forms/>
    </main>
  );
}
