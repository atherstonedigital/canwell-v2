import Link from "next/link";

export interface Crumb {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

// QA Audit 2026-05-14 — Task 21: visible breadcrumbs on inner pages.
// JSON-LD BreadcrumbList is still emitted by the page-level Schema component
// using the same `items` array, so visible markup and structured data stay
// in lockstep.
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length <= 1) return null;
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={item.url}>
                {isLast ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <>
                    <Link href={item.url}>{item.name}</Link>
                    <span className="breadcrumb-sep" aria-hidden="true">
                      ›
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
