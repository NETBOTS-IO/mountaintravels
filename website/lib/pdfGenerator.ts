import { useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
  },
  companyInfo: {
    fontSize: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
});

const TourPDF = ({ tour, siteConfig }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src={siteConfig?.logoUrl || "/default-logo.png"} />
        <View style={styles.companyInfo}>
          <Text>{siteConfig?.name || "Company Name"}</Text>
          <Text>{siteConfig?.contact?.address || "Address not available"}</Text>
          <Text>{siteConfig?.contact?.phone || "Phone not available"}</Text>
          <Text>{siteConfig?.contact?.email || "Email not available"}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{tour?.title || "Tour Title"}</Text>

      {/* Tour Details */}
      <View style={styles.section}>
        <Text style={styles.text}>Location: {tour?.location || "N/A"}</Text>
        <Text style={styles.text}>Duration: {tour?.days || 0} Days</Text>
        <Text style={styles.text}>Group Size: {tour?.groupSize || "N/A"}</Text>
        <Text style={styles.text}>Difficulty: {tour?.difficulty || "N/A"}</Text>
        <Text style={styles.text}>Price: ${tour?.price || 0}</Text>
        <Text style={styles.text}>Best Season: {tour?.bestSeason || "N/A"}</Text>
        <Text style={styles.text}>Description: {tour?.description || "No description available."}</Text>
      </View>

      {/* Itinerary */}
      <View style={styles.section}>
        <Text style={styles.text}>Itinerary:</Text>
        {Array.isArray(tour?.itineraries) && tour.itineraries.length > 0 ? (
          tour.itineraries.map((day, index) => (
            <View key={index}>
              <Text style={styles.text}>Day {day?.day || index + 1}: {day?.description || "No description"}</Text>
              <Text style={styles.text}>Activities: {day?.activities || "N/A"}</Text>
              <Text style={styles.text}>Accommodation: {day?.accommodation || "N/A"}</Text>
              <Text style={styles.text}>Meals: {day?.meals || "N/A"}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.text}>No itinerary available.</Text>
        )}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} {siteConfig?.name || "Company Name"}. All rights reserved.
      </Text>
    </Page>
  </Document>
);

const generatePDF = async (tour, siteConfig) => {
  const pdfDoc = <TourPDF tour={tour} siteConfig={siteConfig} />;
  return pdf(pdfDoc).toBlob();
};

const TourPDFDownloader = ({ tour, siteConfig }) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      const pdfBlob = await generatePDF(tour, siteConfig);
      const url = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${tour?.title || "Tour"} - Itinerary.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
      setLoading(false);
    }
  };


};

export default TourPDFDownloader;
