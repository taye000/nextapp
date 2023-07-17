import Image from "next/image";
import Link from "next/link";
import imanilogo from "../public/imanilogo.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        {/* <Image
          className="mb-8 align-left"
          src={imanilogo}
          alt="imani.js Logo"
          width={100}
          height={25}
          priority
        /> */}
        {/* <header>Imani Escrow Services</header> */}
        <section id="showcase">
          <div className="container">
            <h1>Imani Escrow Services</h1>
            <p>
              Helping small businesses and individuals to transact safely and
              securely.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
