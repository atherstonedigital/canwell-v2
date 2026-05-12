import { Inline, PlainWithPlaceholders } from "@/components/signature/RichText";
import { Placeholder } from "@/components/signature/Placeholder";
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

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.slug} className="review">
              {review.is_placeholder && (
                <span className="review-placeholder-tag">
                  <Placeholder label="Draft review" />
                </span>
              )}
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

        <div className="reviews-cta">
          {reviews_cta_url ? (
            <a
              href={reviews_cta_url}
              className="btn btn-tertiary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {reviews_cta_label}
            </a>
          ) : (
            <span className="btn btn-tertiary" aria-disabled="true">
              {reviews_cta_label}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
