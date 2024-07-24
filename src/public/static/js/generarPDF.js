document.addEventListener('DOMContentLoaded', async () => {
  const nombreUsuario = localStorage.getItem('nombreUsuario');
  if (nombreUsuario) {
    document.getElementById('nombreUsuario').innerText = nombreUsuario;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const contratoId = parseInt(urlParams.get('contratoId'));

  try {
    const response = await fetch(`/api/buscainfo/c`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_contrato: contratoId })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contratoInfo = await response.json();

    const contratoHtml = `
      <p>Cliente: ${contratoInfo.cliente}</p>
      <p>Fecha de inicio: ${contratoInfo.fecha_inicio}</p>
      <p>Fecha de fin: ${contratoInfo.fecha_fin}</p>
      <p>Presupuesto: ${contratoInfo.presupuesto}</p>
      <h3>Proyectos:</h3>
      <ul>
        ${contratoInfo.proyectos.map(proyecto => `
          <li>
            <p>Número de proyecto (id): ${proyecto.id_proyecto}</p>
            <p>Producto: ${proyecto.producto}</p>
            <p>Cantidad de producto: ${proyecto.cantidad_producto}</p>
            <p>Áreas:</p>
            <ul>
              ${proyecto.areas.map(area => `
                <li>
                  <p>Nombre del área: ${area.nombre_area}</p>
                  <p>Estado: ${area.estado}</p>
                  <p>Presupuesto: ${area.presupuesto}</p>
                </li>
              `).join('')}
            </ul>
          </li>
        `).join('')}
      </ul>
    `;

    document.getElementById('contrato-info').innerHTML = contratoHtml;

    document.getElementById('generar-pdf').addEventListener('click', () => {
      if (typeof window.jspdf !== 'undefined') {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4'
        });

        const margin = { top: 120, bottom: 70, left: 85, right: 85 };
        let yPosition = margin.top + 40;

        // Encabezado del PDF
        pdf.setFont("cambria", "bold");
        pdf.setFontSize(24);
        pdf.text("SOLUCIONES METÁLICAS", pdf.internal.pageSize.width / 2, margin.top - 50, { align: 'center' });

        pdf.setFontSize(16);
        pdf.text(`INFORME DE CONTRATO N° ${contratoId}`, pdf.internal.pageSize.width / 2, margin.top - 20, { align: 'center' });

        pdf.setFont("cambria", "bold");
        pdf.setFontSize(12);
        pdf.text("Datos:", margin.left, yPosition);
        yPosition += 20;

        pdf.setFont("cambria", "normal");
        pdf.setFontSize(12);
        pdf.text(`Número de Contrato: ${contratoId}`, margin.left, yPosition);
        yPosition += 20;
        pdf.text(`Fecha de generación de informe: ${new Date().toLocaleDateString()}`, margin.left, yPosition);
        yPosition += 20;
        pdf.text(`Cliente: ${contratoInfo.cliente}`, margin.left, yPosition);
        yPosition += 20;
        pdf.text(`Fecha de inicio: ${contratoInfo.fecha_inicio}`, margin.left, yPosition);
        yPosition += 20;
        pdf.text(`Fecha de fin: ${contratoInfo.fecha_fin}`, margin.left, yPosition);
        yPosition += 20;
        pdf.text(`Presupuesto: ${contratoInfo.presupuesto}`, margin.left, yPosition);
        yPosition += 30;

        // Proyectos
        pdf.setFont("cambria", "bold");
        pdf.text("Proyectos:", margin.left, yPosition);
        yPosition += 20;

        pdf.setFont("cambria", "normal");
        contratoInfo.proyectos.forEach(proyecto => {
          pdf.text(`Número de proyecto (id): ${proyecto.id_proyecto}`, margin.left, yPosition);
          yPosition += 20;
          pdf.text(`Producto: ${proyecto.producto}`, margin.left, yPosition);
          yPosition += 20;
          pdf.text(`Cantidad de producto: ${proyecto.cantidad_producto}`, margin.left, yPosition);
          yPosition += 30;
          pdf.setFont("cambria", "bold"); // Cambiar a negrita
          pdf.text("Áreas:", margin.left, yPosition);
          yPosition += 20;
          
          pdf.setFont("cambria", "normal"); // Regresar a normal
          proyecto.areas.forEach(area => {
            pdf.text(`Nombre del área: ${area.nombre_area}`, margin.left + 20, yPosition);
            yPosition += 20;
            pdf.text(`Estado: ${area.estado}`, margin.left + 20, yPosition);
            yPosition += 20;
            pdf.text(`Presupuesto: ${area.presupuesto}`, margin.left + 20, yPosition);
            yPosition += 20;
          });
          yPosition += 10;
        });

        pdf.save(`contrato_${contratoId}.pdf`);
      } else {
        console.error('jsPDF library not loaded');
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
});
