import Image from "next/image";
import Link from "next/link";
import imanilogo from "../public/imanilogo.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <section id="showcase">
          <div className="container">
            <h1>
              Helping small businesses and individuals to transact safely and
              securely.
            </h1>
          </div>
        </section>
        <div className="container">
          <section id="main">
            <h1>Welcome to imani escrow services</h1>
          </section>
          <aside id="sidebar">
            <p>
              Helping small businesses and individuals to transact safely and
              securely.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
