import { exportSpellsToPDF } from './export-pdf.js';

async function loadSpells() {
  const isLocal = location.protocol === 'file:';
    console.log(isLocal);
  if (isLocal) {
    return [
      {
        "Conhecida": "Não",
        "Título": "Alterar-se",
        "Ritual": "Não",
        "Nível": "2",
        "Escola": "Transmutação",
        "Tempo de Conjuração": "Ação",
        "Alcance": "Pessoal",
        "Componente": "V, S",
        "Duração": "1 hora",
        "Concentração": "Sim",
        "Descrição": "Você altera sua forma física...",
        "Classe": "Feiticeiro, Mago",
        "Página": 240,
        "Fonte": "Livro do Jogador 5.5"
      }
    ];
  } else {
    const response = await fetch('spells5-5.json');
    return await response.json();
  }
}

function fetchSpells(spells) {
  let knownSpells = JSON.parse(localStorage.getItem("knownSpells5-5")) || [];

  const searchInput = document.getElementById("search");
  const levelFilter = document.getElementById("level-filter");
  const schoolFilter = document.getElementById("school-filter");
  const durationFilter = document.getElementById("duration-filter");
  const classFilter = document.getElementById("class-filter");
  const showKnownOnly = document.getElementById("show-known-only");
  const sortFilter = document.getElementById("sort-filter");
  const spellList = document.getElementById("spell-list");

  function fillOptions(spells, key, element) {
    const values = spells.flatMap(spell => spell[key]?.split(",").map(s => s.trim()) || []);
    const uniqueValues = [...new Set(values)];
    uniqueValues.sort();
    uniqueValues.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      element.appendChild(option);
    });
  }

  fillOptions(spells, "Escola", schoolFilter);
  fillOptions(spells, "Classe", classFilter);
  fillOptions(spells, "Duração", durationFilter);

  function renderSpells() {
    const query = searchInput.value.toLowerCase();
    const level = levelFilter.value;
    const escola = schoolFilter.value;
    const duracao = durationFilter.value;
    const classe = classFilter.value;
    const ordenacao = sortFilter.value;
    const onlyKnown = showKnownOnly.checked;

    let filtered = spells.filter(spell => {
      const matchesTitle = spell.Título.toLowerCase().includes(query);
      const matchesLevel = level === "" || spell.Nível.toString() === level;
      const matchesEscola = escola === "" || spell.Escola.includes(escola);
      const matchesDuracao = duracao === "" || spell.Duração.includes(duracao);
      const matchesClasse = classe === "" || (spell.Classe || "").includes(classe);
      const matchesKnown = !onlyKnown || knownSpells.includes(spell.Título);
      return matchesTitle && matchesLevel && matchesEscola && matchesDuracao && matchesClasse && matchesKnown;
    });

    // Ordenação
    if (ordenacao === "level-asc") {
      filtered.sort((a, b) => parseInt(a.Nível) - parseInt(b.Nível));
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
      const el = document.createElement("div");
      el.classList.add("spell");
      if (isKnown) el.classList.add("known");

      el.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3>${spell.Título} (Nível ${spell.Nível})</h3>
          <button class="known-btn" data-title="${spell.Título}">
            ${isKnown ? "⭐ Conhecida" : "☆ Marcar"}
          </button>
        </div>
        <p><strong>Escola:</strong> ${spell.Escola}</p>
        <p><strong>Classe:</strong> ${spell.Classe}</p>
        <p><strong>Tempo:</strong> ${spell["Tempo de Conjuração"]}</p>
        <p><strong>Alcance:</strong> ${spell.Alcance}</p>
        <p><strong>Componentes:</strong> ${spell.Componente}</p>
        <p><strong>Duração:</strong> ${spell.Duração}${spell.Concentração === "Sim" ? " (Concentração)" : ""}</p>
        <p><strong>Descrição:</strong><br>${spell.Descrição.replace(/\n/g, "<br>")}</p>
        <p><em>Página: ${spell.Página} | Fonte: ${spell.Fonte}</em></p>
      `;

      spellList.appendChild(el);
    });

    document.querySelectorAll(".known-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const title = btn.getAttribute("data-title");
        if (knownSpells.includes(title)) {
          knownSpells = knownSpells.filter(t => t !== title);
        } else {
          knownSpells.push(title);
        }
        localStorage.setItem("knownSpells5-5", JSON.stringify(knownSpells));
        renderSpells();
      });
    });
  }

  // Eventos
  searchInput.addEventListener("input", renderSpells);
  levelFilter.addEventListener("change", renderSpells);
  schoolFilter.addEventListener("change", renderSpells);
  durationFilter.addEventListener("change", renderSpells);
  classFilter.addEventListener("change", renderSpells);
  showKnownOnly.addEventListener("change", renderSpells);
  sortFilter.addEventListener("change", renderSpells);

  document.getElementById("export-pdf").addEventListener("click", () => {
    exportSpellsToPDF(spells, knownSpells, "grimorio_5.5.pdf");
    });

  renderSpells();
}

loadSpells().then(spells => {
  fetchSpells(spells);
});
