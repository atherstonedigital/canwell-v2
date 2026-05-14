import { marked } from "marked";

interface MarkdownBodyProps {
  text: string;
  className?: string;
}

// QA Audit 2026-05-14 — Task 7: render long-form body content through marked
// so authored markdown — `**bold**`, `- bullet lists`, `[links](/url)` —
// actually renders instead of leaking literal asterisks and dashes onto the
// page. Keeps the {{PLACEHOLDER}} pill convention by rewriting the rendered
// HTML, the same way the inspiration article page does.
//
// Authored copy uses single-asterisk `*italic*` for editorial emphasis. Marked
// preserves that as `<em>`, which matches the existing Inline behaviour for
// titles, so headings and body now share one emphasis rule.

function renderPlaceholders(html: string): string {
  return html.replace(
    /\{\{([A-Z0-9_]+)\}\}/g,
    (_match, label) =>
      `<span class="placeholder-pill" title="Awaiting content. Edit via the admin to replace.">${label}</span>`
  );
}

export function MarkdownBody({ text, className }: MarkdownBodyProps) {
  if (!text) return null;
  marked.setOptions({ gfm: true, breaks: false });
  const raw = marked.parse(text, { async: false }) as string;
  const html = renderPlaceholders(raw);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
