import jsPDF from "jspdf";

export async function generateTourPDF(tour: any, siteConfig?: any) {
  try {
    const doc = new jsPDF();
    let y = 20; // initial Y position

    // Helper to add wrapped text
    const addWrappedText = (text: string, x: number, yPos: number, maxWidth = 180, lineHeight = 6) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, yPos);
      return lines.length * lineHeight;
    };

    // Title
    doc.setFontSize(18);
    y += addWrappedText(tour?.title || "Tour Details", 10, y);

    // Description
    doc.setFontSize(12);
    y += 10;
    y += addWrappedText(
      `Description: ${tour?.description || "No description available."}`,
      10,
      y
    );

    // Basic details
    y += 8;
    y += addWrappedText(`Location: ${tour?.location || "N/A"}`, 10, y);
    y += addWrappedText(`Duration: ${tour?.days || 0} Days`, 10, y);
    y += addWrappedText(`Group Size: ${tour?.groupSize || "N/A"}`, 10, y);
    y += addWrappedText(`Difficulty: ${tour?.difficulty || "N/A"}`, 10, y);
    y += addWrappedText(`Price: $${tour?.price || 0}`, 10, y);
    y += addWrappedText(`Best Season: ${tour?.bestSeason || "N/A"}`, 10, y);

    // Itinerary Section
    y += 10;
    doc.setFontSize(14);
    y += addWrappedText("Itinerary:", 10, y);

    doc.setFontSize(11);
    if (Array.isArray(tour?.itineraries) && tour.itineraries.length > 0) {
      tour.itineraries.forEach((day: any, index: number) => {
        // Page break check
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        // Day Title
        y += 6;
        y += addWrappedText(
          `Day ${day?.day || index + 1}: ${day?.description || "No description"}`,
          10,
          y
        );

        // Activities
        y += addWrappedText(
          `Activities: ${day?.activities || "N/A"}`,
          15,
          y
        );

        // Accommodation
        y += addWrappedText(
          `Accommodation: ${day?.accommodation || "N/A"}`,
          15,
          y
        );

        // Meals
        y += addWrappedText(
          `Meals: ${day?.meals || "N/A"}`,
          15,
          y
        );
      });
    } else {
      y += addWrappedText("No itinerary available.", 10, y);
    }

    // Footer
    if (siteConfig?.name) {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `© ${new Date().getFullYear()} ${siteConfig?.name || "Company Name"}. All rights reserved.`,
        10,
        290
      );
    }

    return doc;
  } catch (err) {
    console.error("PDF generation failed:", err);
    throw err;
  }
}
