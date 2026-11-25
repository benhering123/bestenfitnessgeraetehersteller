import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Archivo, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xn--bestenfitnessgertehersteller-lnc.de"),
  title: {
    default: "Fitnessgeräte-Hersteller im Vergleich | bestenfitnessgerätehersteller.de",
    template: "%s | bestenfitnessgerätehersteller.de",
  },
  description:
    "Elf Hersteller von Studiogeräten im Vergleich, für Betreiber, die ein Studio neu bauen. Jede Angabe mit Quelle und Prüfdatum, Etiketten statt Noten.",
};

export const viewport: Viewport = {
  themeColor: "#0d3b2e",
};

const NAV = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

function Wordmark() {
  return (
    <Link href="/" className="wordmark" translate="no" aria-label="bestenfitnessgerätehersteller.de, Startseite">
      <span className="wordmark__top">
        <span className="wordmark__mark">besten</span>fitnessgeräte
      </span>
      <span className="wordmark__bottom">hersteller.de</span>
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body>
        <a className="skip" href="#inhalt">
          Zum Inhalt springen
        </a>
        <header className="masthead">
          <div className="masthead__inner">
            <Wordmark />
            <p className="masthead__tag">Herstellervergleich für Studiobetreiber</p>
            <nav className="masthead__nav" aria-label="Hauptnavigation">
              <ul>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main id="inhalt">{children}</main>

        <footer className="colophon">
          <div className="colophon__inner">
            <p className="colophon__disclosure">
              Betrieben von Telju Fitness BeNeLux B.V., einem der verglichenen Hersteller.
            </p>
            <nav aria-label="Fußnavigation">
              <ul className="colophon__nav">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </footer>
        <script defer src="/_vercel/insights/script.js" />
      </body>
    </html>
  );
}
