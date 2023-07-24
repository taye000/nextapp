import About from "./components/About";
import Forms from "./components/Forms";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <About/>
      <Forms/>
    </main>
  );
}
