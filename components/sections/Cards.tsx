import Link from "next/link";
import Image from "next/image";
import { Inline } from "@/components/signature/RichText";
import { getShowroomImage } from "@/lib/showroom-images";

export interface Card {
  title: string;
  body: string;
  link_label?: string;
  link_url?: string;
  image?: string;
}

interface CardsProps {
  eyebrow?: string;
  h2?: string;
  intro?: string;
  cards: Card[];
  variant?: "service" | "compact";
  columns?: 2 | 3;
}

export function Cards({
  eyebrow,
  h2,
  intro,
  cards,
  variant = "service",
  columns = 3,
}: CardsProps) {
  return (
    <section className={`cards-section variant-${variant}`}>
      <div className="container">
        {(eyebrow || h2 || intro) && (
          <div className="cards-header">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {h2 && (
              <h2 className="display-h2">
                <Inline text={h2} />
              </h2>
            )}
            {intro && (
              <p className="cards-intro">
                <Inline text={intro} />
              </p>
            )}
          </div>
        )}

        <div
          className="cards-grid"
          data-cols={columns}
        >
          {cards.map((card, idx) => {
            const meta = getShowroomImage(card.image);
            const inner = (
              <>
                {variant === "service" && card.image && (
                  <div className="card-image">
                    <Image
                      src={card.image}
                      alt={meta?.alt ?? card.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="card-body">
                  <h3 className="card-title">
                    <Inline text={card.title} />
                  </h3>
                  <p className="card-description">
                    <Inline text={card.body} />
                  </p>
                  {card.link_label && (
                    <span className="card-link">{card.link_label}</span>
                  )}
                </div>
              </>
            );
            if (card.link_url) {
              return (
                <Link key={idx} href={card.link_url} className="card service-card">
                  {inner}
                </Link>
              );
            }
            return (
              <div key={idx} className="card service-card no-link">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
