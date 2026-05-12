// QA Audit 2026-05-12 — Task 10: page-level JSON-LD injection helper.

interface SchemaProps {
  id: string;
  payload: object | null;
}

export function Schema({ id, payload }: SchemaProps) {
  if (!payload) return null;
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
