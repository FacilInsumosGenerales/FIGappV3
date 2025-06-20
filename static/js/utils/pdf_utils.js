// Función para insertar saltos de página cuando los elementos exceden la altura de una página A4
function insertPageBreaks(content) {
    // Create a temporary container to parse and measure the content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;

    const pageHeight = 297 * 2.83; // Page height approximation in mm
    let totalHeight = 0;

    // Track elements that need the `page-break-before` class
    const elementsToAddClass = [];

    // Iterate over each child in the parsed content
    Array.from(tempElement.children).forEach((element) => {
        // Append element temporarily to measure accurately
        document.body.appendChild(element);
        const rect = element.getBoundingClientRect();
        totalHeight += rect.height;

        // Identify elements exceeding page height or within 'avoid-break' parents
        if (totalHeight > pageHeight) {
            const parentWithAvoidBreak = element.closest('.avoid-break');
            if (parentWithAvoidBreak) {
                elementsToAddClass.push(parentWithAvoidBreak.outerHTML);
            } else {
                elementsToAddClass.push(element.outerHTML);
            }
        }

        // Remove element from DOM after measuring
        document.body.removeChild(element);
    });

    // Update content by adding `page-break-before` class to necessary elements
    elementsToAddClass.forEach((originalElementHTML) => {
        const updatedElementHTML = originalElementHTML.replace(
            /class="([^"]*)"/,
            'class="$1 page-break-before"'
        );
        content = content.replace(originalElementHTML, updatedElementHTML);
    });

    return content; // Return the modified HTML content as a string
}


// Funcion para generar PDF
 
export const generarPDF = async (content) => {
    const newContent = insertPageBreaks(content);

    const elemento = document.createElement('div');
    elemento.innerHTML = newContent;

    try {

        // Configuración de opciones para html2pdf
        const opcionesPdf = {
            margin: [0, 0, 1, 0],
            html2canvas: { scale: 2.5 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { avoid: ["tr"], before: ".page-break-before" }
        };

        // Inicializar html2pdf con las opciones
        const generadorPdf = html2pdf().set(opcionesPdf).from(elemento);

        // Generar el PDF y obtener el Blob directamente
        console.log('Generando PDF...');
        const blobPdf = await generadorPdf.outputPdf('blob');
        if (!blobPdf) {
            throw new Error('No se pudo generar el Blob del PDF.');
        }
        console.log('Blob del PDF generado correctamente:', blobPdf);

        // Generar la URL del Blob
        const urlPdf = URL.createObjectURL(blobPdf);
        console.log('URL del PDF generada:', urlPdf);

        // Retornar el Blob y la URL
        return [ blobPdf, urlPdf ];
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        throw error; // Relanzar el error para que pueda ser manejado externamente
    }
};