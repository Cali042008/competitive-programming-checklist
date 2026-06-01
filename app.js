const STORAGE_KEY = "cp-roadmap-checklist-v2";

const sourceOptions = [
  { id: "all", label: "Toate" },
  { id: "oji", label: "OJI" },
  { id: "oni", label: "ONI" },
  { id: "lot", label: "Lot" },
  { id: "baraj", label: "Baraj" },
  { id: "codeforces", label: "Codeforces" },
  { id: "other", label: "Other" },
];

const classOptions = [
  { id: "all", label: "Toate clasele" },
  { id: "V", label: "Clasa V" },
  { id: "VI", label: "Clasa VI" },
  { id: "VII", label: "Clasa VII" },
  { id: "VIII", label: "Clasa VIII" },
  { id: "IX", label: "Clasa IX" },
  { id: "X", label: "Clasa X" },
  { id: "XI_XII", label: "Clasa XI-XII" },
  { id: "BARAJ_JR", label: "Baraj lot juniori" },
  { id: "BARAJ_SR", label: "Baraj lot seniori" },
];

const classOrder = ["V", "VI", "VII", "VIII", "IX", "X", "XI_XII", "BARAJ_JR", "BARAJ_SR"];

const chapterTopicOrder = [
  {
    chapter: "Capitolul 1 - Noțiuni elementare",
    topics: [
      "Primul program în C++",
      "Structura alternativă",
      "Structura repetitivă",
      "Prelucrarea cifrelor",
      "Maxime și minime",
      "Generarea șirurilor de numere",
      "Divizibilitatea",
      "Abordarea problemelor cu secvențe",
    ],
  },
  {
    chapter: "Capitolul 2 - Tablouri, tehnici introductive",
    topics: [
      "Vectori (tablouri unidimensionale)",
      "Vectori de frecvență",
      "Matrici (tablouri bidimensionale)",
      "Simularea soluției",
      "Algoritmi de sortare",
      "Ciurul lui Eratostene",
      "Sume parțiale. Șmenul lui Mars",
    ],
  },
  {
    chapter: "Capitolul 3 - Sortare, căutare, tehnici de limbaj",
    topics: [
      "Subprograme",
      "Șiruri de caractere",
      "Operații pe biți",
      "Introducere în Metoda Greedy",
      "Căutarea binară",
      "Two pointers",
      "Sliding window",
      "Principiul lui Dirichlet (principiul cutiei)",
      "Baze de numerație",
      "Indicatorul lui Euler",
      "Aritmetică modulară. Ridicare la putere în timp logaritmic",
    ],
  },
  {
    chapter: "Capitolul 4 - Structuri liniare, fundamente",
    topics: [
      "Tehnica divide et impera",
      "Căutare completă. Tehnica Backtracking",
      "Numere mari",
      "Normalizarea datelor",
      "Principiul includerii și excluderii (pinex)",
      "Invers modular",
      "Coada",
      "Stiva",
      "Analiza amortizată",
      "Algoritmul lui Lee. Flood Fill",
      "Evaluarea unei expresii",
      "Deque",
      "Abordarea problemelor ad-hoc",
      "Abordarea problemelor constructive",
      "Introducere în teoria grafurilor",
      "Introducere în arbori. Diametrul unui arbore",
      "Introducere în programarea dinamică",
    ],
  },
  {
    chapter: "Capitolul 5 - DP I, grafuri I, combinatorică",
    topics: [
      "Problema rucsacului",
      "Subșir comun maximal",
      "Subșir crescător maximal",
      "Dinamică pe stări exponențiale (bitmask DP)",
      "Sortare topologică",
      "Cicluri în grafuri. Grafuri funcționale",
      "Păduri de mulțimi disjuncte (DSU)",
      "Arbore parțial de cost minim",
      "Algoritmi pentru drumuri minime",
      "Tehnica celor două DFS-uri (rerooting)",
      "Introducere în combinatorică",
      "Hashing",
      "Meet in the Middle",
    ],
  },
  {
    chapter: "Capitolul 6 - Structuri, arbori, probleme speciale",
    topics: [
      "Descompuneri în bucăți de radical (Square Root Decomposition)",
      "Arbori de intervale (segment trees)",
      "Arbori indexați binar",
      "Sparse Table. Binary Lifting. Range Minimum Query (RMQ)",
      "Trie (arbore de prefixe)",
      "Programare dinamică cu structuri de date",
      "Binary lifting. Lowest common ancestor (LCA)",
      "Programare dinamică pe arbore",
      "Small to large",
      "Heavy light decomposition (HLD)",
      "Probleme interactive",
      "Probleme output only",
      "Bitsets",
      "Căutare ternară",
      "Funcția Möbius",
    ],
  },
  {
    chapter: "Capitolul 7 - DP II, grafuri II, matematică",
    topics: [
      "Programare dinamică pe intervale (range DP)",
      "Programare dinamică pe cifre (digit DP)",
      "Programare dinamică pe permutări",
      "Componente tare conexe",
      "Componente biconexe",
      "Înfășurătoare convexă",
    ],
  },
  {
    chapter: "Capitolul 8 - Matematică avansată, stringuri",
    topics: ["Rotație lexicografică minimă", "Tablou/arbore de sufixe"],
  },
  {
    chapter: "Capitolul 9 - Structuri avansate, optimizări",
    topics: ["D&C DP (optimizarea divide et impera)", "Aliens DP"],
  },
];

const topicClassMap = {
  "Primul program în C++": "V",
  "Structura alternativă": "V",
  "Structura repetitivă": "V",
  "Prelucrarea cifrelor": "V",
  "Maxime și minime": "V",
  "Generarea șirurilor de numere": "V",
  "Divizibilitatea": "V",
  "Abordarea problemelor cu secvențe": "V",
  "Vectori (tablouri unidimensionale)": "V",
  "Vectori de frecvență": "V",
  "Matrici (tablouri bidimensionale)": "VI",
  "Simularea soluției": "VI",
  "Algoritmi de sortare": "IX",
  "Ciurul lui Eratostene": "VI",
  "Sume parțiale. Șmenul lui Mars": "VI",
  "Subprograme": "VII",
  "Șiruri de caractere": "VIII",
  "Operații pe biți": "IX",
  "Introducere în Metoda Greedy": "VII",
  "Căutarea binară": "VI",
  "Two pointers": "VII",
  "Sliding window": "VI",
  "Principiul lui Dirichlet (principiul cutiei)": "IX",
  "Baze de numerație": "VI",
  "Indicatorul lui Euler": "IX",
  "Aritmetică modulară. Ridicare la putere în timp logaritmic": "VII",
  "Tehnica divide et impera": "X",
  "Căutare completă. Tehnica Backtracking": "X",
  "Numere mari": "VII",
  "Normalizarea datelor": "VIII",
  "Principiul includerii și excluderii (pinex)": "XI_XII",
  "Invers modular": "X",
  "Coada": "VIII",
  "Stiva": "VII",
  "Analiza amortizată": "XI_XII",
  "Algoritmul lui Lee. Flood Fill": "BARAJ_JR",
  "Evaluarea unei expresii": "BARAJ_JR",
  "Deque": "VIII",
  "Abordarea problemelor ad-hoc": "IX",
  "Abordarea problemelor constructive": "IX",
  "Introducere în teoria grafurilor": "XI_XII",
  "Introducere în arbori. Diametrul unui arbore": "XI_XII",
  "Introducere în programarea dinamică": "X",
  "Problema rucsacului": "X",
  "Subșir comun maximal": "X",
  "Subșir crescător maximal": "X",
  "Dinamică pe stări exponențiale (bitmask DP)": "XI_XII",
  "Sortare topologică": "XI_XII",
  "Cicluri în grafuri. Grafuri funcționale": "XI_XII",
  "Păduri de mulțimi disjuncte (DSU)": "XI_XII",
  "Arbore parțial de cost minim": "XI_XII",
  "Algoritmi pentru drumuri minime": "XI_XII",
  "Tehnica celor două DFS-uri (rerooting)": "BARAJ_JR",
  "Introducere în combinatorică": "X",
  "Hashing": "XI_XII",
  "Meet in the Middle": "XI_XII",
  "Descompuneri în bucăți de radical (Square Root Decomposition)": "BARAJ_JR",
  "Arbori de intervale (segment trees)": "XI_XII",
  "Arbori indexați binar": "XI_XII",
  "Sparse Table. Binary Lifting. Range Minimum Query (RMQ)": "XI_XII",
  "Trie (arbore de prefixe)": "XI_XII",
  "Programare dinamică cu structuri de date": "BARAJ_JR",
  "Binary lifting. Lowest common ancestor (LCA)": "XI_XII",
  "Programare dinamică pe arbore": "XI_XII",
  "Small to large": "BARAJ_JR",
  "Heavy light decomposition (HLD)": "BARAJ_SR",
  "Probleme interactive": "BARAJ_JR",
  "Probleme output only": "BARAJ_JR",
  Bitsets: "BARAJ_SR",
  "Căutare ternară": "BARAJ_SR",
  "Funcția Möbius": "BARAJ_SR",
  "Programare dinamică pe intervale (range DP)": "BARAJ_JR",
  "Programare dinamică pe cifre (digit DP)": "BARAJ_JR",
  "Programare dinamică pe permutări": "BARAJ_JR",
  "Componente tare conexe": "XI_XII",
  "Componente biconexe": "XI_XII",
  "Înfășurătoare convexă": "X",
  "Rotație lexicografică minimă": "BARAJ_SR",
  "Tablou/arbore de sufixe": "BARAJ_SR",
  "D&C DP (optimizarea divide et impera)": "BARAJ_SR",
  "Aliens DP": "BARAJ_SR",
};

const topicAliases = {
  "Operatii pe biti": "Operații pe biți",
  "Greedy (Introducere)": "Introducere în Metoda Greedy",
  "Binary search": "Căutarea binară",
  "Smenu lu mars": "Sume parțiale. Șmenul lui Mars",
  "Sume partiale. Smenul lui Mars": "Sume parțiale. Șmenul lui Mars",
  "Backtracking": "Căutare completă. Tehnica Backtracking",
  "Fill.Algoritmul lui Lee": "Algoritmul lui Lee. Flood Fill",
  "AINT": "Arbori de intervale (segment trees)",
  "Arbori de intervale(AINT)": "Arbori de intervale (segment trees)",
  "Arbori indexati binar(AIB)": "Arbori indexați binar",
  "Sparse Table. Binary Lifting. Range Minimum Query (RMQ)": "Sparse Table. Binary Lifting. Range Minimum Query (RMQ)",
  "Programare dinamica cu structuri de date(DP)": "Programare dinamică cu structuri de date",
  "Programare dinamică cu structuri de date(DP)": "Programare dinamică cu structuri de date",
  "Lucrul cu arbori": "Binary lifting. Lowest common ancestor (LCA)",
  "Programare dinamică pe arbore": "Programare dinamică pe arbore",
  "Dynamic Programming": "Programare dinamică pe intervale (range DP)",
  "Teoria Graphurilor": "Componente tare conexe",
};

const state = {
  chapters: [],
  completed: loadCompleted(),
  sourceFilter: "all",
  classFilter: "all",
  searchQuery: "",
};

const filteredSolvedEl = document.getElementById("filteredSolved");
const filteredTotalEl = document.getElementById("filteredTotal");
const filteredPercentEl = document.getElementById("filteredPercent");
const overallSolvedEl = document.getElementById("overallSolved");
const progressFillEl = document.getElementById("progressFill");
const milestoneTextEl = document.getElementById("milestoneText");
const sourceFiltersEl = document.getElementById("sourceFilters");
const classFilterEl = document.getElementById("classFilter");
const searchInputEl = document.getElementById("searchInput");
const chaptersContainerEl = document.getElementById("chaptersContainer");
const chapterCountTextEl = document.getElementById("chapterCountText");
const expandAllButtonEl = document.getElementById("expandAllButton");
const collapseAllButtonEl = document.getElementById("collapseAllButton");

boot();

async function boot() {
  buildSourceFilters();
  buildClassFilter();
  bindControls();

  const raw = await fetch("./data/probleme.txt");
  const text = await raw.text();
  state.chapters = normalizeData(parseProblemText(text));
  render();
}

function parseProblemText(rawText) {
  const lines = rawText.split("\n");
  const topics = [];
  let currentTopic = null;
  let currentSection = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const topicMatch = line.match(/^([^<][^:]+):$/);
    if (topicMatch) {
      const title = normalizeTopicTitle(topicMatch[1]);
      currentTopic = { title, sections: [] };
      topics.push(currentTopic);
      currentSection = null;
      continue;
    }

    if (line.startsWith("<ul") || line.startsWith("</ul")) continue;

    if (line.startsWith("<li>")) {
      if (!currentTopic) continue;
      if (!currentSection) {
        currentSection = { heading: "Probleme", items: [] };
        currentTopic.sections.push(currentSection);
      }
      currentSection.items.push(parseListItem(line));
      continue;
    }

    if (!line.startsWith("<")) {
      if (!currentTopic) continue;
      currentSection = { heading: normalizeTopicTitle(line.replace(/:$/, "")), items: [] };
      currentTopic.sections.push(currentSection);
    }
  }

  return topics.filter((topic) => topic.sections.some((section) => section.items.length > 0));
}

function parseListItem(line) {
  const anchorMatch = line.match(/<a href="([^"]+)">([^<]+)<\/a>/);
  if (anchorMatch) {
    return { label: decodeHtml(anchorMatch[2]), url: decodeHtml(anchorMatch[1]) };
  }
  return { label: decodeHtml(line.replace(/<\/?li>/g, "")), url: "" };
}

function normalizeTopicTitle(value) {
  const trimmed = decodeHtml(value.trim());
  return topicAliases[trimmed] || trimmed;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function normalizeData(topics) {
  const chapterMap = new Map(chapterTopicOrder.map((chapter) => [chapter.chapter, []]));
  chapterMap.set("Capitol extra - Alte topicuri", []);

  for (const topic of topics) {
    let targetChapter = "Capitol extra - Alte topicuri";
    for (const chapter of chapterTopicOrder) {
      if (chapter.topics.includes(topic.title)) {
        targetChapter = chapter.chapter;
        break;
      }
    }
    chapterMap.get(targetChapter).push(topic);
  }

  const chapters = [];
  let chapterIndex = 0;

  for (const [chapterTitle, chapterTopics] of chapterMap.entries()) {
    if (!chapterTopics.length) continue;
    chapterIndex += 1;

    chapters.push({
      id: `chapter-${chapterIndex}`,
      title: chapterTitle,
      topics: chapterTopics.map((topic, topicIndex) => {
        const minClass = topicClassMap[topic.title] || "XI_XII";
        return {
          id: `topic-${chapterIndex}-${topicIndex + 1}`,
          title: topic.title,
          minClass,
          sections: topic.sections.map((section, sectionIndex) => ({
            id: `section-${chapterIndex}-${topicIndex + 1}-${sectionIndex + 1}`,
            heading: section.heading,
            items: section.items.map((item, itemIndex) => {
              const source = classifySource(item);
              const id = buildProblemId(chapterTitle, topic.title, section.heading, item.label, item.url, itemIndex);
              return {
                id,
                label: item.label,
                url: item.url,
                source,
                classes: computeClassTags(minClass),
                search: `${chapterTitle} ${topic.title} ${section.heading} ${item.label} ${source}`.toLowerCase(),
              };
            }),
          })),
        };
      }),
    });
  }

  return chapters;
}

function buildProblemId(chapterTitle, topicTitle, sectionTitle, label, url, index) {
  const raw = `${chapterTitle}__${topicTitle}__${sectionTitle}__${label}__${url}__${index}`;
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function computeClassTags(minClass) {
  const minIndex = classOrder.indexOf(minClass);
  if (minIndex === -1) return ["XI_XII", "BARAJ_JR", "BARAJ_SR"];
  return classOrder.slice(minIndex);
}

function classifySource(item) {
  const text = `${item.label} ${item.url}`.toLowerCase();
  if (text.includes("baraj")) return "baraj";
  if (text.includes(" lot ") || text.includes("lot juniori") || text.includes("lot seniori") || text.includes("/lot")) return "lot";
  if (text.includes("oni")) return "oni";
  if (text.includes("oji") || text.includes("omi ")) return "oji";
  if (text.includes("codeforces") || text.includes("cf ") || text.includes("codeforces.com")) return "codeforces";
  return "other";
}

function loadCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistCompleted() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.completed));
}

function buildSourceFilters() {
  sourceFiltersEl.innerHTML = sourceOptions
    .map(
      (option) => `
    <button type="button" class="chip" data-source-filter="${option.id}" aria-pressed="${
      option.id === state.sourceFilter ? "true" : "false"
    }">${option.label}</button>
  `,
    )
    .join("");
}

function buildClassFilter() {
  classFilterEl.innerHTML = classOptions
    .map(
      (option) => `
    <option value="${option.id}" ${option.id === state.classFilter ? "selected" : ""}>${option.label}</option>
  `,
    )
    .join("");
}

function bindControls() {
  sourceFiltersEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-source-filter]");
    if (!button) return;
    state.sourceFilter = button.dataset.sourceFilter;
    buildSourceFilters();
    render();
  });

  classFilterEl.addEventListener("change", (event) => {
    state.classFilter = event.target.value;
    render();
  });

  searchInputEl.addEventListener("input", (event) => {
    state.searchQuery = event.target.value.trim().toLowerCase();
    render();
  });

  expandAllButtonEl.addEventListener("click", () => {
    document.querySelectorAll(".chapter").forEach((chapterEl) => {
      chapterEl.dataset.open = "true";
    });
  });

  collapseAllButtonEl.addEventListener("click", () => {
    document.querySelectorAll(".chapter").forEach((chapterEl) => {
      chapterEl.dataset.open = "false";
    });
  });
}

function render() {
  const visibleChapters = state.chapters.map(filterChapter).filter(Boolean);
  renderStats(visibleChapters);
  renderChapters(visibleChapters);
}

function filterChapter(chapter) {
  const visibleTopics = chapter.topics.map(filterTopic).filter(Boolean);
  if (!visibleTopics.length) return null;
  const totals = collectTotals(visibleTopics);
  return { ...chapter, topics: visibleTopics, totals };
}

function filterTopic(topic) {
  const visibleSections = topic.sections
    .map((section) => {
      const visibleItems = section.items.filter(matchesFilters);
      if (!visibleItems.length) return null;
      return { ...section, items: visibleItems };
    })
    .filter(Boolean);
  if (!visibleSections.length) return null;
  const totals = collectTotalsFromSections(visibleSections);
  return { ...topic, visibleSections, totals };
}

function matchesFilters(problem) {
  const sourceMatches = state.sourceFilter === "all" || problem.source === state.sourceFilter;
  const classMatches = state.classFilter === "all" || problem.classes.includes(state.classFilter);
  const searchMatches = !state.searchQuery || problem.search.includes(state.searchQuery);
  return sourceMatches && classMatches && searchMatches;
}

function collectTotals(topics) {
  return topics.reduce(
    (acc, topic) => {
      acc.total += topic.totals.total;
      acc.solved += topic.totals.solved;
      return acc;
    },
    { total: 0, solved: 0 },
  );
}

function collectTotalsFromSections(sections) {
  return sections.reduce(
    (acc, section) => {
      section.items.forEach((item) => {
        acc.total += 1;
        if (state.completed[item.id]) acc.solved += 1;
      });
      return acc;
    },
    { total: 0, solved: 0 },
  );
}

function renderStats(visibleChapters) {
  const filteredTotals = visibleChapters.reduce(
    (acc, chapter) => {
      acc.total += chapter.totals.total;
      acc.solved += chapter.totals.solved;
      return acc;
    },
    { total: 0, solved: 0 },
  );

  const overallSolved = Object.values(state.completed).filter(Boolean).length;
  const percent = filteredTotals.total ? Math.round((filteredTotals.solved / filteredTotals.total) * 100) : 0;

  filteredSolvedEl.textContent = String(filteredTotals.solved);
  filteredTotalEl.textContent = String(filteredTotals.total);
  filteredPercentEl.textContent = `${percent}%`;
  overallSolvedEl.textContent = String(overallSolved);
  progressFillEl.style.width = `${percent}%`;
  milestoneTextEl.textContent = buildMilestoneCopy(filteredTotals);
  chapterCountTextEl.textContent = `${visibleChapters.length} capitole vizibile`;
}

function buildMilestoneCopy({ solved, total }) {
  if (!total) return "Niciun rezultat pe filtrul curent.";
  if (solved === total) return "Filtrul curent este complet bifat. Bun, foarte bun.";
  const nextMilestone = Math.ceil((solved + 1) / 10) * 10;
  const remaining = Math.min(nextMilestone, total) - solved;
  if (remaining <= 0) return "Ai trecut un checkpoint bun. Mai ține ritmul.";
  return `${remaining} probleme până la următorul checkpoint.`;
}

function renderChapters(visibleChapters) {
  if (!visibleChapters.length) {
    chaptersContainerEl.innerHTML = `
      <div class="empty-state">
        N-am găsit nimic pe combinația asta de filtre. Încearcă un search mai scurt sau schimbă clasa.
      </div>
    `;
    return;
  }

  chaptersContainerEl.innerHTML = visibleChapters
    .map((chapter, index) => {
      const percent = chapter.totals.total ? Math.round((chapter.totals.solved / chapter.totals.total) * 100) : 0;
      return `
      <article class="chapter" data-open="${index === 0 ? "true" : "false"}" id="${chapter.id}">
        <button type="button" class="chapter-header" data-chapter-toggle="${chapter.id}">
          <div>
            <p class="chapter-label">Capitol roadmap</p>
            <h2 class="chapter-title">${escapeHtml(chapter.title)}</h2>
          </div>
          <div class="chapter-summary">
            <span class="chapter-pill">${chapter.totals.solved}/${chapter.totals.total} rezolvate</span>
            <span class="chapter-pill">${percent}%</span>
            <span class="chapter-chevron">▾</span>
          </div>
        </button>
        <div class="chapter-body">
          ${chapter.topics.map(renderTopic).join("")}
        </div>
      </article>
    `;
    })
    .join("");

  chaptersContainerEl.querySelectorAll("[data-chapter-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const chapterEl = document.getElementById(button.dataset.chapterToggle);
      chapterEl.dataset.open = chapterEl.dataset.open === "true" ? "false" : "true";
    });
  });

  chaptersContainerEl.querySelectorAll(".problem-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", handleToggleProblem);
  });
}

function renderTopic(topic) {
  return `
    <section class="article">
      <div class="article-head">
        <div>
          <h3 class="article-title">${escapeHtml(topic.title)}</h3>
          <div class="article-meta">
            <span class="meta-badge">Programă: ${formatClassLabel(topic.minClass)}</span>
            <span class="meta-badge">${topic.totals.solved}/${topic.totals.total} bifate</span>
          </div>
        </div>
      </div>

      ${topic.visibleSections
        .map(
          (section) => `
        <div class="problem-group">
          <p class="problem-group-title">${escapeHtml(section.heading)}</p>
          <div class="problem-list">
            ${section.items.map(renderProblem).join("")}
          </div>
        </div>
      `,
        )
        .join("")}
    </section>
  `;
}

function renderProblem(problem) {
  const completed = Boolean(state.completed[problem.id]);
  const safeUrl = problem.url || "#";

  return `
    <label class="problem-row" data-completed="${completed ? "true" : "false"}">
      <input class="problem-checkbox" type="checkbox" data-problem-id="${problem.id}" ${completed ? "checked" : ""}>
      <div class="problem-main">
        <a class="problem-link ${completed ? "completed" : ""}" href="${safeUrl}" target="_blank" rel="noreferrer">
          ${escapeHtml(problem.label)}
        </a>
      </div>
      <div class="problem-tags">
        <span class="tag source-${problem.source}">${formatSourceLabel(problem.source)}</span>
        <span class="tag class-tag">${formatClassLabel(problem.classes[0])}</span>
      </div>
    </label>
  `;
}

function handleToggleProblem(event) {
  const checkbox = event.target;
  state.completed[checkbox.dataset.problemId] = checkbox.checked;
  persistCompleted();
  render();
}

function formatSourceLabel(source) {
  return {
    oji: "OJI",
    oni: "ONI",
    lot: "Lot",
    baraj: "Baraj",
    codeforces: "Codeforces",
    other: "Other",
  }[source];
}

function formatClassLabel(classId) {
  return {
    V: "Clasa V",
    VI: "Clasa VI",
    VII: "Clasa VII",
    VIII: "Clasa VIII",
    IX: "Clasa IX",
    X: "Clasa X",
    XI_XII: "Clasa XI-XII",
    BARAJ_JR: "Baraj juniori",
    BARAJ_SR: "Baraj seniori",
  }[classId] || classId;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
