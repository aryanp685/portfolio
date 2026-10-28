import { Fragment, useMemo } from "react";

/**
 * Accessible text splitter. Renders visually-split spans while keeping the
 * original string available to screen readers.
 */
export function SplitWords({
  text,
  className = "",
  wordClass = "",
}) {
  const words = useMemo(() => text.split(" "), [text]);
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <span aria-hidden className={`word ${wordClass}`} data-word>
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

export function SplitChars({
  text,
  className = "",
  charClass = "",
}) {
  const chars = useMemo(() => Array.from(text), [text]);
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={`char ${charClass}`}
          data-char
          style={{ whiteSpace: c === " " ? "pre" : undefined }}
        >
          {c}
        </span>
      ))}
    </span>
  );
}
