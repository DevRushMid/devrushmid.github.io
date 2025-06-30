async function fetchSpells() {
  const response = await fetch('spells.json');
  const spells = await response.json();

  const searchInput = document.getElementById("search");
  const levelFilter = document.getElementById("level-filter");
  const spellList = document.getElementById("spell-list");

  function renderSpells() {
    const query = searchInput.value.toLowerCase();
    const level = levelFilter.value;

    const filtered = spells.filter(spell => {
      const matchesName = spell.Título.toLowerCase().includes(query);
      const matchesLevel = level === "" || spell.Nível.toString() === level;
      return matchesName && matchesLevel;
    });

    spellList.innerHTML = "";
    if (filtered.length === 0) {
      spellList.innerHTML = "<p>Nenhuma magia encontrada.</p>";
      return;
    }

    filtered.forEach(spell => {
      const spellEl = document.createElement("div");
      spellEl.classList.add("spell");

      spellEl.innerHTML = `
        <h3>${spell.Título} (Nível ${spell.Nível})</h3>
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

  searchInput.addEventListener("input", renderSpells);
  levelFilter.addEventListener("change", renderSpells);

  renderSpells(); // render inicial
}

fetchSpells();
