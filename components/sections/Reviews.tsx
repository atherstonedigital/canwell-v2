import { Inline, PlainWithPlaceholders } from "@/components/signature/RichText";
import type { Review } from "@/lib/types";

interface ReviewsProps {
  reviews_eyebrow: string;
  reviews_h2: string;
  reviews_cta_label: string;
  reviews_cta_url: string;
  reviews: Review[];
}

export function Reviews({
  reviews_eyebrow,
  reviews_h2,
  reviews_cta_label,
  reviews_cta_url,
  reviews,
}: ReviewsProps) {
  return (
    <section className="reviews">
      <div className="container">
        <div className="reviews-header">
          <p className="eyebrow">{reviews_eyebrow}</p>
          <h2 className="display-h2">
            <Inline text={reviews_h2} />
          </h2>
        </div>

        {/* QA Audit 2026-05-12 — Task 3: no Draft review label on published testimonials. */}
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.slug} className="review">
              <p className="review-quote">
                “<PlainWithPlaceholders text={review.quote} />”
              </p>
              <p className="review-name">
                <PlainWithPlaceholders text={review.name} />
              </p>
              <p className="review-location">
                <PlainWithPlaceholders text={review.location} />
              </p>
            </div>
          ))}
        </div>

        {/* QA Audit 2026-05-14 — Task 27: removed the "more reviews coming"
            disclaimer; three real testimonials carry the section on their own.
            Google Business Profile link reappears once the URL is supplied. */}
        {reviews_cta_url && (
          <div className="reviews-cta">
            <a
              href={reviews_cta_url}
              className="btn btn-tertiary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {reviews_cta_label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
