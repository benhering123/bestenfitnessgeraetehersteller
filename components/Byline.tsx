// Byline row that sits directly under every H1. It carries the author, the
// date the page was last checked, and the short ownership disclosure that
// UWG §5a(4) requires on every page. Keep it one quiet line; no box, no banner.

type BylineProps = {
  /** Author name. Leave unset until a real author is confirmed. */
  author?: string;
  /** ISO date (YYYY-MM-DD) of the last fact check for this page. */
  checked: string;
};

const DISCLOSURE =
  "Betrieben von Telju Fitness BeNeLux B.V., einem der verglichenen Hersteller.";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(`${iso}T12:00:00Z`));
}

export function Byline({ author, checked }: BylineProps) {
  return (
    <p className="byline">
      <span className="byline__item">
        Von{" "}
        {author ? (
          <span className="byline__author">{author}</span>
        ) : (
          <span className="byline__placeholder">[Autorenname folgt]</span>
        )}
      </span>
      <span className="byline__item">
        Stand: <time dateTime={checked}>{formatDate(checked)}</time>
      </span>
      <span className="byline__item byline__disclosure">{DISCLOSURE}</span>
    </p>
  );
}
