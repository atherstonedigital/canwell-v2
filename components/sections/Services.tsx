import Link from "next/link";
import Image from "next/image";
import { SectionMarker } from "@/components/signature/SectionMarker";
import { Inline } from "@/components/signature/RichText";
import type { ServiceCard } from "@/lib/types";

interface ServicesProps {
  services_section_label: string;
  services_h2: string;
  services_intro?: string;
  service_cards: ServiceCard[];
}

export function Services({
  services_section_label,
  services_h2,
  services_intro,
  service_cards,
}: ServicesProps) {
  return (
    <section className="services">
      <div className="container">
        <div className="services-header">
          <SectionMarker num="02" label={services_section_label} />
          <h2 className="display-h2">
            <Inline text={services_h2} />
          </h2>
          {services_intro && (
            <p>
              <Inline text={services_intro} />
            </p>
          )}
        </div>

        <div className="services-grid">
          {service_cards.map((card) => (
            <Link key={card.link_url} href={card.link_url} className="service-card">
              <div className="service-image" aria-hidden="true">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="service-body">
                <h3 className="service-title">{card.title}</h3>
                <p className="service-description">{card.body}</p>
                <span className="service-link">{card.link_label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
