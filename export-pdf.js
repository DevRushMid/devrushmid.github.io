export function exportSpellsToPDF(spells, knownTitles, filename = "grimorio.pdf") {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const conhecidas = spells
    .filter(spell => knownTitles.includes(spell.Título))
    .sort((a, b) => {
      const nivelA = parseInt(a.Nível);
      const nivelB = parseInt(b.Nível);
      if (nivelA !== nivelB) return nivelA - nivelB;
      return a.Título.localeCompare(b.Título);
    });

  if (conhecidas.length === 0) {
    alert("Nenhuma magia conhecida para exportar.");
    return;
  }

  let y = 10;

  conhecidas.forEach((spell, index) => {
    if (y > 270) {
      doc.addPage();
      y = 10;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${spell.Título} (Nível ${spell.Nível})`, 10, y);
    y += 7;

    const infoLines = [
      `Escola: ${spell.Escola}`,
      `Classe: ${spell.Classe}`,
      `Tempo: ${spell["Tempo de Conjuração"]}`,
      `Alcance: ${spell.Alcance}`,
      `Componentes: ${spell.Componente}`,
      `Duração: ${spell.Duração}${spell.Concentração === "Sim" ? " (Concentração)" : ""}`
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    infoLines.forEach(line => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += 6;
    });

    y += 2;

    const descricao = doc.splitTextToSize(spell.Descrição, 180);
    if (y + descricao.length * 6 > 280) {
      doc.addPage();
      y = 10;
    }
    doc.text(descricao, 10, y);
    y += descricao.length * 6 + 8;

    if (index < conhecidas.length - 1) {
      doc.setDrawColor(200);
      doc.line(10, y, 200, y);
      y += 10;
    }
  });

  doc.save(filename);
}
