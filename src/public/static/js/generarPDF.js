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
              <p>Nombre del proyecto: ${proyecto.nombre_proyecto}</p>
              <p>Áreas:</p>
              <ul>
                ${proyecto.areas.map(area => `
                  <li>
                    <p>Nombre del área: ${area.nombre_area}</p>
                    <p>Estado: ${area.estado}</p>
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

          // Encabezado del PDF
          pdf.setFont("helvetica");
          pdf.setFontSize(16);
          pdf.text("Informe de Contrato", 40, 40);
          pdf.setFontSize(12);
          pdf.text("Soluciones Metálicas", 40, 60);
          pdf.setFontSize(10);
          pdf.text("Fecha: " + new Date().toLocaleDateString(), 40, 80);

          // Agregar contenido al PDF con estilos personalizados
          pdf.setFont("helvetica");
          pdf.setFontSize(12);

          let yPosition = 100;
          pdf.text(`Cliente: ${contratoInfo.cliente}`, 40, yPosition);
          yPosition += 20;
          pdf.text(`Fecha de inicio: ${contratoInfo.fecha_inicio}`, 40, yPosition);
          yPosition += 20;
          pdf.text(`Fecha de fin: ${contratoInfo.fecha_fin}`, 40, yPosition);
          yPosition += 20;
          pdf.text(`Presupuesto: ${contratoInfo.presupuesto}`, 40, yPosition);
          yPosition += 30;

          // Proyectos
          pdf.text("Proyectos:", 40, yPosition);
          yPosition += 20;

          contratoInfo.proyectos.forEach(proyecto => {
            pdf.text(`Áreas:`, 40, yPosition);
            yPosition += 20;
            proyecto.areas.forEach(area => {
              pdf.text(`Nombre del área: ${area.nombre_area}`, 60, yPosition);
              yPosition += 20;
              pdf.text(`Estado: ${area.estado}`, 60, yPosition);
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
