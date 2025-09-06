import JsonLd from "./JsonLd"

export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TourMaker Pakistan",
    url: "https://tourmakerpakistan.com",
    logo: "https://tourmakerpakistan.com/tourmaker-logo.png",
    sameAs: [
      "https://facebook.com/tourmakerpakistan",
      "https://instagram.com/tourmakerpakistan",
      "https://twitter.com/mtpakistan",
      "https://youtube.com/tourmakerpakistan",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-123-456-7890",
      contactType: "customer service",
      email: "info@tourmakerpakistan.com",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Adventure Street",
      addressLocality: "Islamabad",
      addressRegion: "ICT",
      postalCode: "44000",
      addressCountry: "PK",
    },
  }

  return <JsonLd data={data} />
}

