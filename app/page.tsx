import { Byline } from "@/components/Byline";

// The compared makers, alphabetical. Alphabetical order is deliberate: the home
// page lists the field and implies no ranking. Fit labels and sourced facts come
// from data/manufacturers/*.json once those files are checked.
const MAKERS = [
  "Atlantis",
  "DHZ Fitness",
  "Gymleco",
  "gym80",
  "Life Fitness / Hammer Strength",
  "Matrix Fitness",
  "Panatta",
  "Precor",
  "Prime Fitness",
  "Technogym",
  "Telju Fitness",
];

const CHECKED = "2026-11-25";

export default function Home() {
  return (
    <article className="issue">
      <header className="issue__head">
        <h1 className="issue__title">Welcher Fitnessgeräte-Hersteller passt zu Ihrem Studio?</h1>
        <Byline checked={CHECKED} />
      </header>

      <div className="issue__lede">
        <p>
          Hier vergleichen wir elf Hersteller von Studiogeräten. Der Vergleich richtet sich an
          Betreiber, die ein Studio neu bauen, einen zweiten Standort eröffnen oder umbauen.
        </p>
        <p>
          Jede Angabe nennt ihre Quelle und das Datum, an dem wir sie geprüft haben. Was ein
          Hersteller nicht veröffentlicht, steht hier als „nicht angegeben“, und wir schätzen keine fehlenden Werte.
        </p>
      </div>

      <section className="method" aria-labelledby="method-title">
        <h2 id="method-title" className="method__title">
          So lesen Sie den Vergleich
        </h2>
        <dl className="method__list">
          <div>
            <dt>Quelle</dt>
            <dd>Jede Angabe verlinkt die Seite, auf der der Hersteller sie veröffentlicht.</dd>
          </div>
          <div>
            <dt>Prüfdatum</dt>
            <dd>Neben jeder Angabe steht, wann wir sie zuletzt geprüft haben.</dd>
          </div>
          <div>
            <dt>Etiketten</dt>
            <dd>
              Es gibt keine Noten und keine Rangliste. Jeder Hersteller erhält ein Etikett:{" "}
              <mark>Beste Wahl für …</mark>
            </dd>
          </div>
        </dl>
      </section>

      <section className="register" aria-labelledby="register-title">
        <div className="register__inner">
          <h2 id="register-title" className="register__title">
            Die elf Hersteller im Vergleich
          </h2>
          <p className="register__note">
            Die Liste ist alphabetisch sortiert. Etiketten und Quellen erscheinen, sobald wir die
            Angaben geprüft haben.
          </p>
          <ul className="register__list">
            {MAKERS.map((name) => (
              <li key={name} className="register__name" translate="no">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
