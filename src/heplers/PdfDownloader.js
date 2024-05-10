import { todaydate } from "../service/datevalidator";

export const handlePdfDownload = (data, airwayBillNumber) => {
    // Convert the Base64 data to a blob
    try {
        const base64Data = data && data.ReportDoc
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Create a URL for the blob and set it as the href of the anchor tag
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = airwayBillNumber + "-" + todaydate() + "-" + ".pdf";

        // Programmatically trigger a click on the anchor to start the download
        anchor.click();

        // Clean up resources
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.log(error)
    }
};