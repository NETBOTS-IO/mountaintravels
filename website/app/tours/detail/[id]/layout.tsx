import { Metadata } from "next";
import { BASE_URL } from "@/app/Var";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const res = await fetch(`${BASE_URL}/api/tours/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { title: "Tour Not Found | Mountain Travels Pakistan" };

    const { data: tour } = await res.json();
    if (!tour) return { title: "Tour Not Found | Mountain Travels Pakistan" };

    return {
      title: `${tour.name} - Mountain Travels Pakistan`,
      description:
        tour.overview?.substring(0, 155) ||
        `Explore ${tour.name} with Mountain Travels Pakistan.`,
      openGraph: {
        title: tour.name,
        description: tour.overview?.substring(0, 155),
        images: tour.coverImage
          ? [
              tour.coverImage.startsWith("http")
                ? tour.coverImage
                : `${BASE_URL}${tour.coverImage}`,
            ]
          : [],
      },
    };
  } catch (error) {
    return {
      title: "Tour Details | Mountain Travels Pakistan",
    };
  }
}

export default async function TourDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  let jsonLd = null;
  try {
    const res = await fetch(`${BASE_URL}/api/tours/${resolvedParams.id}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const { data: tour } = await res.json();
      if (tour) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tour.name,
          description: tour.overview,
          touristType: ["Sightseeing", "Adventure"],
          offers: {
            "@type": "Offer",
            price: tour.price || 0,
            priceCurrency: "USD",
          },
        };
      }
    }
  } catch (e) {
    // ignore
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
