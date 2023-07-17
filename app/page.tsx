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
        <div className="container">
          <Link
            href={"/buyer"} 
            className="left-0 top-0 flex w-full justify-center border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          >
            Buyer
          </Link>
          <Link
            href={"/seller"}
            className="left-0 top-0 flex w-full justify-center border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          >
            Seller
          </Link>
        </div>
      </div>
    </main>
  );
}
