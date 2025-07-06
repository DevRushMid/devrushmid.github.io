function fetchSpells(spells) {
  //const response = await fetch('spells.json');
  // const spells = await response.json();

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

async function loadSpells() {
  const isLocal = location.protocol === 'file:';

  if(isLocal){
    return [
      {
        "Conhecida": "Não",
        "Título": "Amizade",
        "Ritual": "Não",
        "Nível": 0,
        "Escola": "Encantamento",
        "Tempo": "1 ação",
        "Alcance": "Pessoal",
        "Componente": "S, M",
        "Duração": "1 minuto",
        "Concentração": "Sim",
        "Descrição": "Material: uma pequena quantidade de maquiagem aplicada ao rosto durante a conjuração da magia.\n\nPela duração, você terá vantagem em todos os testes de Carisma direcionados a uma criatura, à sua escolha, que não seja hostil a você. Quando a magia acabar, a criatura perceberá que você usou maia para influenciar o humor dela, e ficará hostil a você. Uma criatura propensa a violência irá atacar você. Outra criatura pode buscar outras formas de retaliação (a critério do Mestre), dependendo da natureza da sua interação com ela.",
        "Fonte": "Livro do Jogador",
        "Opções": "Sim"
      },
      {
        "Conhecida": "Não",
        "Título": "Ataque Certeiro",
        "Ritual": "Não",
        "Nível": 0,
        "Escola": "Adivinhação",
        "Tempo": "1 ação",
        "Alcance": "9 metros",
        "Componente": "S",
        "Duração": "1 rodada",
        "Concentração": "Sim",
        "Descrição": "Você estende sua mão e aponta o dedo para um alvo no alcance. Sua magia garante a você uma breve intuição sobre as defesas do alvo. No seu próximo turno, você terá vantagem na primeira jogada de ataque contra o alvo, considerando que essa magia não tenha acabado.",
        "Fonte": "Livro do Jogador",
        "Opções": "Não"
      },
      {
        "Conhecida": "Não",
        "Título": "Bordão Místico",
        "Ritual": "Não",
        "Nível": 0,
        "Escola": "Transmutação",
        "Tempo": "1 ação bônus",
        "Alcance": "Toque",
        "Componente": "V, S, M",
        "Duração": "1 minuto",
        "Concentração": "Não",
        "Descrição": "Material: visco, uma folha de trevo e uma clava ou bordão.\n\nA madeira de uma clava ou bordão, que você esteja segurando, é imbuída com o poder da natureza. Pela duração, você pode usar sua habilidade de conjuração ao invés da sua Força para as jogadas de ataque e dano corpo-a-corpo usando essa arma, e o dado de dano da arma se torna um d8. A arma também se torna mágica, se ela já não for. A magia acaba se você conjura-la novamente ou se você soltar a arma.",
        "Fonte": "Livro do Jogador"
      },
      {
        "Conhecida": "Não",
        "Título": "Chama Sagrada",
        "Ritual": "Não",
        "Nível": 0,
        "Escola": "Evocação",
        "Tempo": "1 ação",
        "Alcance": "18 metros",
        "Componente": "V, S",
        "Duração": "Instantânea",
        "Concentração": "Não",
        "Descrição": "Radiação similar a uma chama desce sobre uma criatura que você possa ver, dentro do alcance. O alvo deve ser bem sucedido num teste de resistência de Destreza ou sofrerá 1d8 de dano radiante. O alvo não recebe qualquer benefício de cobertura contra esse teste de resistência.\nO dano da magia aumenta em 1d8 quando você alcança o 5° nível (2d8), 11° nível (3d8) e 17° nível (4d8).",
        "Fonte": "Livro do Jogador",
        "Opções": "Escolas"
      }
      
    ];
  } else {
    const response = await fetch('spells5.json');
    return await response.json();
  }
}

loadSpells().then(spells => {
  fetchSpells(spells);
});
