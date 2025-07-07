window.exportSpellsToPDF = function (spells, knownTitles, filename = "grimorio.pdf") {
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

  let y = 10; // posição inicial da primeira página
  const margemInferior = 20;
  const alturaMaxima = 280;
  const alturaLinha = 6;

  conhecidas.forEach((spell, index) => {
    // Função utilitária para pular página se necessário
    function checarEspaco(quantasLinhas) {
      if (y + (quantasLinhas * alturaLinha) > alturaMaxima - margemInferior) {
        doc.addPage();
        y = 10;
      }
    }

    // Cabeçalho
    checarEspaco(1);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${spell.Título} (Nível ${spell.Nível})`, 10, y);
    y += 7;

    // Bloco de informações
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
      checarEspaco(1);
      doc.text(line, 10, y);
      y += alturaLinha;
    });

    y += 2;

    // Descrição com divisão automática entre páginas
    const descricao = doc.splitTextToSize(spell.Descrição, 180);
    let i = 0;
    while (i < descricao.length) {
      const linhasRestantes = Math.floor((alturaMaxima - y - margemInferior) / alturaLinha);
      const trecho = descricao.slice(i, i + linhasRestantes);
      doc.text(trecho, 10, y);
      y += trecho.length * alturaLinha;
      i += trecho.length;
      if (i < descricao.length) {
        doc.addPage();
        y = 10;
      }
    }

    y += 8;

    // Linha separadora
    if (index < conhecidas.length - 1) {
      checarEspaco(1);
      doc.setDrawColor(200);
      doc.line(10, y, 200, y);
      y += 10;
    }
  });

  doc.save(filename);
};
