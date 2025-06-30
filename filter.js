async function fetchSpells() {
  const response = await fetch('spells.json');
  const spells = await response.json();
  let knownSpells = JSON.parse(localStorage.getItem("knownSpells")) || [];

  const searchInput = document.getElementById("search");
  const levelFilter = document.getElementById("level-filter");
  const schoolFilter = document.getElementById("school-filter");
  const componentFilter = document.getElementById("component-filter");
  const durationFilter = document.getElementById("duration-filter");
  const sourceFilter = document.getElementById("source-filter");
  const sortFilter = document.getElementById("sort-filter");
  const spellList = document.getElementById("spell-list");

  // Função auxiliar para preencher filtros únicos
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

  // Preenche os filtros adicionais
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

    let filtered = spells.filter(spell => {
      const matchesName = spell.Título.toLowerCase().includes(query);
      const matchesLevel = level === "" || spell.Nível.toString() === level;
      const matchesEscola = escola === "" || spell.Escola === escola;
      const matchesComponentes = componente === "" || spell.Componente === componente;
      const matchesDuracao = duracao === "" || spell.Duração === duracao;
      const matchesFonte = fonte === "" || spell.Fonte === fonte;
      return (
        matchesName &&
        matchesLevel &&
        matchesEscola &&
        matchesComponentes &&
        matchesDuracao &&
        matchesFonte
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
      const spellEl = document.createElement("div");
      spellEl.classList.add("spell");

      const isKnown = knownSpells.includes(spell.Título);

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
  }

  // Botões de marcação
  document.querySelectorAll(".known-btn").forEach(button => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      if (knownSpells.includes(title)) {
        knownSpells = knownSpells.filter(t => t !== title);
      } else {
        knownSpells.push(title);
      }
      localStorage.setItem("knownSpells", JSON.stringify(knownSpells));
      renderSpells(); // re-renderiza para atualizar visual
    });
  });

  // Eventos
  searchInput.addEventListener("input", renderSpells);
  levelFilter.addEventListener("change", renderSpells);
  schoolFilter.addEventListener("change", renderSpells);
  componentFilter.addEventListener("change", renderSpells);
  durationFilter.addEventListener("change", renderSpells);
  sourceFilter.addEventListener("change", renderSpells);
  sortFilter.addEventListener("change", renderSpells);

  renderSpells(); // inicial
}

fetchSpells();
