import { Fragment } from "react";
import {
  parseInlineEmphasis,
  parsePlaceholders,
  type InlineSegment,
  type TextSegment,
} from "@/lib/text";
import { Placeholder } from "./Placeholder";

interface InlineProps {
  text: string;
}

/**
 * Renders inline text honouring *italic* markers AND {{PLACEHOLDER}} pills.
 * Placeholders win — they're hoisted first, then each non-placeholder segment
 * is parsed for italics.
 */
export function Inline({ text }: InlineProps) {
  const segments = parsePlaceholders(text);
  return (
    <>
      {segments.map((seg, idx) => {
        if (typeof seg === "string") {
          return <Italics key={idx} text={seg} />;
        }
        return <Placeholder key={idx} label={seg.placeholder} />;
      })}
    </>
  );
}

function Italics({ text }: { text: string }) {
  const parts: InlineSegment[] = parseInlineEmphasis(text);
  return (
    <>
      {parts.map((p, i) =>
        "em" in p ? (
          <em key={i}>{p.em}</em>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        )
      )}
    </>
  );
}

/**
 * Paragraph block: splits a body string on blank lines into <p> elements.
 * Each line still supports Inline (italics + placeholders).
 */
export function Paragraphs({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  if (!text) return null;
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={className}>
          <Inline text={p} />
        </p>
      ))}
    </>
  );
}

/**
 * Plain text with placeholder pills inline, no italic parsing.
 * Used for cases like meta labels where asterisks aren't expected.
 */
export function PlainWithPlaceholders({ text }: { text: string }) {
  const segments: TextSegment[] = parsePlaceholders(text);
  return (
    <>
      {segments.map((seg, idx) =>
        typeof seg === "string" ? (
          <Fragment key={idx}>{seg}</Fragment>
        ) : (
          <Placeholder key={idx} label={seg.placeholder} />
        )
      )}
    </>
  );
}
