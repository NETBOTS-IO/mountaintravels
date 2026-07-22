import { Metadata } from "next";
import { BASE_URL } from "@/app/Var";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const res = await fetch(`${BASE_URL}/api/popular/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok)
      return { title: "Destination Not Found | Mountain Travels Pakistan" };

    const { data: destination } = await res.json();
    if (!destination)
      return { title: "Destination Not Found | Mountain Travels Pakistan" };

    return {
      title: `${destination.name} - Mountain Travels Pakistan`,
      description:
        destination.description?.substring(0, 155) ||
        `Explore ${destination.name} with Mountain Travels Pakistan.`,
      openGraph: {
        title: `${destination.name} - Mountain Travels Pakistan`,
        description: destination.description?.substring(0, 155),
        images: destination.image
          ? [
              destination.image.startsWith("http")
                ? destination.image
                : `${BASE_URL}${destination.image}`,
            ]
          : [],
      },
    };
  } catch (error) {
    return {
      title: "Destination Details | Mountain Travels Pakistan",
    };
  }
}

export default function DestinationDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
