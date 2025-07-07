document.getElementById("export-pdf").addEventListener("click", () => {
  exportSpellsToPDF(spells, knownSpells, "grimorio_5.5.pdf");
});

async function loadSpells() {
  const isLocal = location.protocol === 'file:';

  if (isLocal) {
    return [
      {
    "Conhecida": "Não",
    "Título": "Alarme",
    "Ritual": "Sim",
    "Nível": "1",
    "Escola": "Abjuração",
    "Tempo de Conjuração": "1 minuto",
    "Alcance": "9 metros",
    "Componente": "V, S, M",
    "Duração": "8 horas",
    "Concentração": "Não",
    "Descrição": "Materia: um sino e um fio de prata.\n\nVocê define um alarme contra intrusão. Escolha uma porta, uma janela ou uma área no alcance da magia que não seja maior do que um Cubo de 6 metros de lados. Até que a magia termine, um alarme o avisa sempre que uma criatura tocar ou entrar na área protegida. Ao conjurar a magia, você pode designar criaturas que não disparam o alarme. Você também escolhe se o alarme é audível ou mental:\nAlarme Mental. Você é alertado por um bipe mental se estiver a menos de 1,5 quilômetro da área protegida. Este bipe o acorda se você estiver dormindo.\nAlarme Sonoro. O alarme produz o som de uma sineta por 10 segundos a até 18 metros da área protegida.",
    "Classe": "Guardião, Mago",
    "Página": 239,
    "Fonte": "Livro do Jogador 5.5"
  },
  {
    "Conhecida": "Não",
    "Título": "Aliado Extraplanar",
    "Ritual": "Não",
    "Nível": "6",
    "Escola": "Invocação",
    "Tempo de Conjuração": "10 minutoss",
    "Alcance": "18 metros",
    "Componente": "V, S",
    "Duração": "Instantânea",
    "Concentração": "Não",
    "Descrição": "Você implora pela ajuda de uma entidade sobrenatural.\nVocê deve conhecer o ser: um deus, um príncipe demônio ou algum outro ser de poder cósmico. Essa entidade envia um Celestial, um Elemental ou um Ínfero leal a ela para ajudá-lo, fazendo com que a criatura apareça em um espaço desocupado no alcance da magia. Se você souber o nome de uma criatura específica, você pode proferir esse nome quando conjurar a magia para solicitar essa criatura, embora você possa obter uma criatura diferente de qualquer modo (à escolha do Mestre).\nQuando a criatura aparece, ela não é obrigada a comportar-se de uma maneira específica. Você pode pedir que ela realize um serviço em troca de pagamento, mas ela não é obrigada a fazê-lo. A tarefa solicitada pode variar de simples (nos levar voando através do abismo ou nos ajudar a lutar em uma batalha) a complexa (espionar nossos inimigos ou nos proteger durante nossa incursão na masmorra). Você deve ser capaz de se comunicar com a criatura para negociar pelos serviços dela.\nO pagamento pode assumir várias formas. Um Celestial pode exigir uma doação considerável de ouro ou itens mágicos para um templo aliado, enquanto um Ínfero pode exigir um sacrifício vivo ou um presente na forma de um tesouro. Algumas criaturas podem trocar o serviço por uma missão realizada por você.\nUma tarefa que pode ser medida em minutos requer um pagamento no valor de 100 PO por minuto. Uma tarefa medida em horas requer 1.000 PO por hora. Já uma tarefa medida em dias (até 10 dias) requer 10.000 PO por dia. O Mestre pode ajustar esses pagamentos com base nas circunstâncias em que você conjurou a magia. Se a tarefa estiver alinhada com os interesses da criatura, o pagamento pode ser reduzido pela metade ou até mesmo dispensado. Tarefas não perigosas normalmente exigem apenas metade do pagamento sugerido, enquanto tarefas especialmente perigosas podem\ndemandar um pagamento maior. Criaturas raramente aceitam tarefas que parecem suicidas.\nDepois que a criatura conclui a tarefa, ou quando a duração combinada do serviço acaba, a criatura retorna ao seu plano de origem após se reportar a você, se possível. Se você não conseguir chegar a um acordo sobre um preço pelo serviço da criatura, a criatura retorna imediatamente ao seu plano de origem.",
    "Classe": "Clérigo",
    "Página": 239,
    "Fonte": "Livro do Jogador 5.5"
  },
  {
    "Conhecida": "Não",
    "Título": "Aljava Veloz",
    "Ritual": "Não",
    "Nível": "5",
    "Escola": "Transmutação",
    "Tempo de Conjuração": "Ação Bônus",
    "Alcance": "Pessoal",
    "Componente": "V, S, M",
    "Duração": "1 minuto",
    "Concentração": "Sim",
    "Descrição": "Materia: uma Aljava no valor de 1 ou mais PO.\n\nAo conjurar a magia e como uma Ação Bônus até que ela termine, você pode realizar dois ataques com uma arma que dispara Flechas ou Virotes, como um Arco Longo ou uma Besta Leve. A magia gera magicamente a munição necessária para cada ataque. Cada Flecha ou Virote criado pela magia causa dano equivalente ao de munição não mágica do seu tipo e se desintegra imediatamente após atingir ou errar o alvo.",
    "Classe": "Guardião",
    "Página": 240,
    "Fonte": "Livro do Jogador 5.5"
  },
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
    "Descrição": "Você altera sua forma física. Escolha uma das seguintes opções. Seus efeitos permanecem pela duração da magia, durante a qual você pode executar uma ação Usar Magia para substituir a opção escolhida por uma diferente.\nAdaptação Aquática. Você cria guelras e membranas entre os dedos. Você pode respirar debaixo d’água e recebe um Deslocamento de Natação igual ao seu Deslocamento.\nArmas Naturais. Você cria garras (Cortante), presas (Perfurante), chifres (Perfurante) ou cascos (Contundente). Ao usar seu Ataque Desarmado para causar dano com essa nova forma, ele causa 1d6 pontos de dano do tipo entre parênteses em vez de causar o dano normal para seu Ataque Desarmado, e você usa seu modificador de atributo de conjuração para as jogadas de ataque e dano em vez de usar Força.\nMudar Aparência. Você altera sua aparência. Você decide sua aparência, incluindo altura, peso, traços faciais, som da voz, comprimento e cor do cabelo, entre outras características distintivas. Você pode parecer um membro de outra espécie, embora nenhuma de suas estatísticas mude. Você não pode parecer como uma criatura de um tamanho diferente, e sua forma básica permanece a mesma; se você é bípede, não pode usar essa magia para se tornar quadrúpede, por exemplo. Pela duração da magia, você pode executar uma ação Usar Magia para mudar sua aparência dessa maneira novamente.",
    "Classe": "Feiticeiro, Mago",
    "Página": 240,
    "Fonte": "Livro do Jogador 5.5"
  },
  {
    "Conhecida": "Não",
    "Título": "Amigos",
    "Ritual": "Não",
    "Nível": 0,
    "Escola": "Encantamento",
    "Tempo de Conjuração": "Ação",
    "Alcance": "3 metros",
    "Componente": "S, M",
    "Duração": "1 minuto",
    "Concentração": "Sim",
    "Descrição": "Material: um pouco de maquiagem.\n\nVocê emana magicamente um sentimento de amizade em relação a uma criatura à sua vista e no alcance da magia. O alvo deve ser bem-sucedido em uma salvaguarda de Sabedoria ou tem a condição Enfeitiçado pela duração da magia. O alvo é bem-sucedido automaticamente se não for um Humanoide, se você estiver lutando contra ele ou se tiver conjurado esta magia nele nas últimas 24 horas.\nA magia encerra se o alvo sofrer dano ou se você realizar uma jogada de ataque, causar dano ou forçar alguém a realizar uma salvaguarda. Quando a magia termina, o alvo sabe que foi Enfeitiçado por você.",
    "Classe": "Bardo, Bruxo, Feiticeiro, Mago",
    "Página": 240,
    "Fonte": "Livro do Jogador 5.5"
  },
  {
    "Conhecida": "Não",
    "Título": "Amizade Animal",
    "Ritual": "Não",
    "Nível": "1",
    "Escola": "Encantamento",
    "Tempo de Conjuração": "Ação",
    "Alcance": "9 metros",
    "Componente": "V, S, M",
    "Duração": "24 horas",
    "Concentração": "Não",
    "Descrição": "Material: um punhado de comida.\n\nEscolha como alvo uma Fera à sua vista e no alcance da magia. O alvo deve ser bem-sucedido em uma salvaguarda de Sabedoria ou tem a condição Enfeitiçado pela duração da magia. Se você ou um de seus aliados causar dano ao alvo, a magia encerra.\n\nUsando um Espaço de Magia de Círculo Superior. \nVocê pode escolher uma criatura adicional para cada círculo de espaço de magia acima de 1.",
    "Classe": "Bardo, Druida, Guardião",
    "Página": 240,
    "Fonte": "Livro do Jogador 5.5"
  },
  {
    "Conhecida": "Não",
    "Título": "Âncora Planar",
    "Ritual": "Não",
    "Nível": "5",
    "Escola": "Abjuração",
    "Tempo de Conjuração": "1 hora",
    "Alcance": "18 metros",
    "Componente": "V, S, M",
    "Duração": "24 horas",
    "Concentração": "Não",
    "Descrição": "Material: uma joia no valor de 1.000 ou mais PO, que a magia consome.\n\nVocê tenta vincular um Celestial, um Elemental, um Feérico ou um Ínfero ao seu serviço. A criatura deve estar no alcance da magia durante todo o período de conjuração. Normalmente, a criatura é primeiro invocada para o centro da versão invertida da magia Círculo Mágico para prendê-la enquanto esta magia é conjurada. Ao concluir a conjuração, o alvo deve ser bem-sucedido em uma salvaguarda de Carisma ou é obrigado a atendê-lo pela duração da magia. Se a criatura foi invocada ou criada por outra magia, a duração daquela magia é estendida para corresponder à duração desta magia.\nUma criatura vinculada deve obedecer aos seus comandos da melhor forma possível. Você pode ordenar que a criatura o acompanhe em uma aventura, proteja um local ou entregue uma mensagem. Se a criatura for Hostil, ela se esforça para distorcer seus comandos para atingir seus próprios objetivos. Se a criatura realizar completamente seus comandos antes que a magia termine, ela viaja até você para relatar esse fato se você estiver no mesmo plano de existência. Se você estiver em um plano diferente, ele retorna ao lugar onde você a vinculou e permanece lá até que a magia termine.\n\nUsando um Espaço de Magia de Círculo Superior.\nA duração aumenta com um espaço de magia 6º círculo (10 dias), 7º círculo (30 dias), 8º círculo (180 dias) e 9º círculo (366 dias).",
    "Classe": "Bardo, Bruxo, Clérigo, Druida, Mago",
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
