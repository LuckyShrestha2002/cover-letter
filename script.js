document.addEventListener("DOMContentLoaded", () => {
    generateCoverLetter();
});

function generateCoverLetter() {
    const coverLetterTextarea = document.getElementById("cover-letter");
    const purpose = document.getElementById("purpose").value;
    const domain = document.getElementById("domain").value;
    const primaryNs = document.getElementById("primary-ns").value;
    const secondaryNs = document.getElementById("secondary-ns").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const date = new Date().toLocaleDateString();

    const coverLetterText = `
Date: ${date}

To,

The Hostmaster,

Mercantile Communication Pvt.Ltd.

Durbar Marg, Kathmandu

Subject: NP Domain Registration

Dear Sir/Madam,

I am writing this letter to request you to kindly register a ${domain} domain for me based on my name. I have provided my personal details, and also attached a scanned copy of my citizenship with this letter for verification. I would be very glad if you approve my domain registration request.

Thank you very much for consideration. I look forward to hearing from you soon.

Domain name: ${domain}

Primary Name Server: ${primaryNs}

Secondary Name Server: ${secondaryNs}

Thank you.

Sincerely,

Name: ${name}

Address: ${address}
    `;

    coverLetterTextarea.value = coverLetterText.trim();
}

function generatePDF() {
    const coverLetterText = document.getElementById("cover-letter").value;

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add date to the top right
    const date = new Date().toLocaleDateString();
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getStringUnitWidth(date) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const textOffset = pageWidth - textWidth - 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(date, textOffset, 20);

    // Add the rest of the text
    const lines = doc.splitTextToSize(coverLetterText, 180);
    doc.setFont('helvetica', 'normal');
    doc.text(lines, 10, 40);

    // Save the PDF
    doc.save('cover_letter.pdf');
}
