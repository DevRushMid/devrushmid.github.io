async function fetchSpells() {
  const response = await fetch('spells.json');
  const spells = await response.json();

  // Recupera magias conhecidas do localStorage
  let knownSpells = JSON.parse(localStorage.getItem("knownSpells")) || [];

  // Elementos de interface
  const searchInput = document.getElementById("search");
  const levelFilter = document.getElementById("level-filter");
  const schoolFilter = document.getElementById("school-filter");
  const componentFilter = document.getElementById("component-filter");
  const durationFilter = document.getElementById("duration-filter");
  const sourceFilter = document.getElementById("source-filter");
  const sortFilter = document.getElementById("sort-filter");
  const showKnownOnly = document.getElementById("show-known-only");
  const spellList = document.getElementById("spell-list");

  // Preenche opções únicas nos filtros
  function fillUniqueOptions(spells, key, element) {
    const uniqueValues = [...new Set(spells.map(spell => spell[key]).filter(Boolean))];
    uniqueValues.sort();
    uniqueValues.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      element.appendChild(option);
    });
  }

  fillUniqueOptions(spells, "Escola", schoolFilter);
  fillUniqueOptions(spells, "Componente", componentFilter);
  fillUniqueOptions(spells, "Duração", durationFilter);
  fillUniqueOptions(spells, "Fonte", sourceFilter);

  function renderSpells() {
    const query = searchInput.value.toLowerCase();
    const level = levelFilter.value;
    const escola = schoolFilter.value;
    const componente = componentFilter.value;
    const duracao = durationFilter.value;
    const fonte = sourceFilter.value;
    const ordenacao = sortFilter.value;

    // Filtro aplicado sobre as magias
    let filtered = spells.filter(spell => {
      const matchesName = spell.Título.toLowerCase().includes(query);
      const matchesLevel = level === "" || spell.Nível.toString() === level;
      const matchesEscola = escola === "" || spell.Escola === escola;
      const matchesComponentes = componente === "" || spell.Componente === componente;
      const matchesDuracao = duracao === "" || spell.Duração === duracao;
      const matchesFonte = fonte === "" || spell.Fonte === fonte;
      const matchesKnown = !showKnownOnly.checked || knownSpells.includes(spell.Título);

      return (
        matchesName &&
        matchesLevel &&
        matchesEscola &&
        matchesComponentes &&
        matchesDuracao &&
        matchesFonte &&
        matchesKnown
      );
    });

    // Ordenação
    if (ordenacao === "level-asc") {
      filtered.sort((a, b) => a.Nível - b.Nível);
    } else if (ordenacao === "alpha") {
      filtered.sort((a, b) => a.Título.localeCompare(b.Título));
    }

    // Renderização
    spellList.innerHTML = "";
    if (filtered.length === 0) {
      spellList.innerHTML = "<p>Nenhuma magia encontrada.</p>";
      return;
    }

    filtered.forEach(spell => {
      const isKnown = knownSpells.includes(spell.Título);
      const spellEl = document.createElement("div");
      spellEl.classList.add("spell");
      if (isKnown) spellEl.classList.add("known");

      spellEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3>${spell.Título} (Nível ${spell.Nível})</h3>
          <button class="known-btn" data-title="${spell.Título}">
            ${isKnown ? '⭐ Conhecida' : '☆ Marcar'}
          </button>
        </div>
        <p><strong>Escola:</strong> ${spell.Escola}</p>
        <p><strong>Tempo de Conjuração:</strong> ${spell.Tempo}</p>
        <p><strong>Alcance:</strong> ${spell.Alcance}</p>
        <p><strong>Componentes:</strong> ${spell.Componente}</p>
        <p><strong>Duração:</strong> ${spell.Duração}${spell.Concentração === "Sim" ? " (concentração)" : ""}</p>
        <p><strong>Descrição:</strong><br>${spell.Descrição.replace(/\n/g, "<br>")}</p>
        <p><em>Fonte: ${spell.Fonte}</em></p>
      `;

      spellList.appendChild(spellEl);
    });

    // Adiciona funcionalidade aos botões de marcar como conhecida
    document.querySelectorAll(".known-btn").forEach(button => {
      button.addEventListener("click", () => {
        const title = button.getAttribute("data-title");
        if (knownSpells.includes(title)) {
          knownSpells = knownSpells.filter(t => t !== title);
        } else {
          knownSpells.push(title);
        }
        localStorage.setItem("knownSpells", JSON.stringify(knownSpells));
        renderSpells();
      });
    });
  }

  // Eventos de filtro
  searchInput.addEventListener("input", renderSpells);
  levelFilter.addEventListener("change", renderSpells);
  schoolFilter.addEventListener("change", renderSpells);
  componentFilter.addEventListener("change", renderSpells);
  durationFilter.addEventListener("change", renderSpells);
  sourceFilter.addEventListener("change", renderSpells);
  sortFilter.addEventListener("change", renderSpells);
  showKnownOnly.addEventListener("change", renderSpells);

  renderSpells(); // inicial

  // Exportar magias conhecidas para PDF
document.getElementById("export-pdf").addEventListener("click", () => {
  if (knownSpells.length === 0) {
    alert("Você não marcou nenhuma magia como conhecida.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 10;

  const conhecidas = spells.filter(spell => knownSpells.includes(spell.Título));

  conhecidas.forEach((spell, index) => {
    const titulo = `${spell.Título} (Nível ${spell.Nível})`;
    const escola = `Escola: ${spell.Escola}`;
    const tempo = `Tempo de Conjuração: ${spell.Tempo}`;
    const alcance = `Alcance: ${spell.Alcance}`;
    const componentes = `Componentes: ${spell.Componente}`;
    const duracao = `Duração: ${spell.Duração}${spell.Concentração === "Sim" ? " (concentração)" : ""}`;
    const descricao = spell.Descrição.replace(/\n/g, " ");

    // Quebra de página automática
    if (y > 270) {
      doc.addPage();
      y = 10;
    }

    doc.setFont("helvetica", "bold");
    doc.text(titulo, 10, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text([escola, tempo, alcance, componentes, duracao], 10, y);
    y += 5 * 6;

    // Descrição longa com quebra de linha automática
    const splitDesc = doc.splitTextToSize(descricao, 180);
    doc.text(splitDesc, 10, y);
    y += splitDesc.length * 6 + 4;

    if (index < conhecidas.length - 1) {
      doc.line(10, y, 200, y);
      y += 6;
    }
  });

  doc.save("grimorio.pdf");
});

}

fetchSpells();
