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

const sortModes = {
  roadmap: "roadmap",
  unsolvedFirst: "unsolved-first",
};

const urlStateKeys = {
  source: "source",
  class: "class",
  search: "q",
  sort: "sort",
  collection: "collection",
};

const roadmapMeta = window.ROADMAP_META || {};
const chapterTopicOrder = roadmapMeta.chapterTopicOrder || [];
const topicClassMap = roadmapMeta.topicClassMap || {};
const collectionOptions = roadmapMeta.collections || [];

const topicAliases = {
  "Operatii pe biti": "OperaÈ›ii pe biÈ›i",
  "Greedy (Introducere)": "Introducere Ã®n Metoda Greedy",
  "Binary search": "CÄƒutarea binarÄƒ",
  "Smenu lu mars": "Sume parÈ›iale. È˜menul lui Mars",
  "Sume partiale. Smenul lui Mars": "Sume parÈ›iale. È˜menul lui Mars",
  "Backtracking": "CÄƒutare completÄƒ. Tehnica Backtracking",
  "Fill.Algoritmul lui Lee": "Algoritmul lui Lee. Flood Fill",
  "AINT": "Arbori de intervale (segment trees)",
  "Arbori de intervale(AINT)": "Arbori de intervale (segment trees)",
  "Arbori indexati binar(AIB)": "Arbori indexaÈ›i binar",
  "Sparse Table. Binary Lifting. Range Minimum Query (RMQ)": "Sparse Table. Binary Lifting. Range Minimum Query (RMQ)",
  "Programare dinamica cu structuri de date(DP)": "Programare dinamicÄƒ cu structuri de date",
  "Programare dinamicÄƒ cu structuri de date(DP)": "Programare dinamicÄƒ cu structuri de date",
  "Lucrul cu arbori": "Binary lifting. Lowest common ancestor (LCA)",
  "Programare dinamicÄƒ pe arbore": "Programare dinamicÄƒ pe arbore",
  "Dynamic Programming": "Programare dinamicÄƒ pe intervale (range DP)",
  "Teoria Graphurilor": "Componente tare conexe",
};

const state = {
  chapters: [],
  completed: loadCompleted(),
  sourceFilter: "all",
  classFilter: "all",
  searchQuery: "",
  sortMode: sortModes.roadmap,
  collectionFilter: "roadmap",
  openChapters: new Set(),
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
const collectionFiltersEl = document.getElementById("collectionFilters");
const chaptersContainerEl = document.getElementById("chaptersContainer");
const chapterCountTextEl = document.getElementById("chapterCountText");
const expandAllButtonEl = document.getElementById("expandAllButton");
const collapseAllButtonEl = document.getElementById("collapseAllButton");
const sortUnsolvedButtonEl = document.getElementById("sortUnsolvedButton");
const nextUnsolvedButtonEl = document.getElementById("nextUnsolvedButton");
const exportProgressButtonEl = document.getElementById("exportProgressButton");
const importProgressButtonEl = document.getElementById("importProgressButton");
const resetProgressButtonEl = document.getElementById("resetProgressButton");
const resetModalEl = document.getElementById("resetModal");
const cancelResetButtonEl = document.getElementById("cancelResetButton");
const confirmResetButtonEl = document.getElementById("confirmResetButton");

boot();

async function boot() {
  applyUrlState();
  buildSourceFilters();
  buildCollectionFilters();
  buildClassFilter();
  bindControls();
  searchInputEl.value = state.searchQuery;
  classFilterEl.value = state.classFilter;

  const raw = await fetch("./data/probleme.txt");
  const text = await raw.text();
  state.chapters = normalizeData(parseProblemText(text));
  if (!state.openChapters.size) {
    const firstChapter = state.chapters[0];
    if (firstChapter) {
      state.openChapters.add(firstChapter.id);
    }
  }
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

function applyUrlState() {
  const params = new URLSearchParams(window.location.search);
  const sourceFilter = params.get(urlStateKeys.source);
  const classFilter = params.get(urlStateKeys.class);
  const searchQuery = params.get(urlStateKeys.search);
  const sortMode = params.get(urlStateKeys.sort);
  const collectionFilter = params.get(urlStateKeys.collection);

  if (sourceFilter && sourceOptions.some((option) => option.id === sourceFilter)) {
    state.sourceFilter = sourceFilter;
  }

  if (classFilter && classOptions.some((option) => option.id === classFilter)) {
    state.classFilter = classFilter;
  }

  if (searchQuery) {
    state.searchQuery = searchQuery.trim().toLowerCase();
  }

  if (sortMode === sortModes.unsolvedFirst) {
    state.sortMode = sortModes.unsolvedFirst;
  }

  if (collectionFilter && collectionOptions.some((option) => option.id === collectionFilter)) {
    state.collectionFilter = collectionFilter;
  }
}

function syncUrlState() {
  const params = new URLSearchParams();

  if (state.sourceFilter !== "all") {
    params.set(urlStateKeys.source, state.sourceFilter);
  }

  if (state.classFilter !== "all") {
    params.set(urlStateKeys.class, state.classFilter);
  }

  if (state.searchQuery) {
    params.set(urlStateKeys.search, state.searchQuery);
  }

  if (state.sortMode !== sortModes.roadmap) {
    params.set(urlStateKeys.sort, state.sortMode);
  }

  if (state.collectionFilter !== "roadmap") {
    params.set(urlStateKeys.collection, state.collectionFilter);
  }

  const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  window.history.replaceState({}, "", nextUrl);
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

function buildCollectionFilters() {
  collectionFiltersEl.innerHTML = collectionOptions
    .map(
      (option) => `
    <button type="button" class="chip ${option.id === state.collectionFilter ? "is-active" : ""}" data-collection-filter="${option.id}" aria-pressed="${
      option.id === state.collectionFilter ? "true" : "false"
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

  collectionFiltersEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-collection-filter]");
    if (!button) return;
    state.collectionFilter = button.dataset.collectionFilter;
    buildCollectionFilters();
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
    state.openChapters = new Set(state.chapters.map((chapter) => chapter.id));
    renderChapters(getVisibleChapters());
  });

  collapseAllButtonEl.addEventListener("click", () => {
    state.openChapters = new Set();
    renderChapters(getVisibleChapters());
  });

  sortUnsolvedButtonEl.addEventListener("click", () => {
    state.sortMode = state.sortMode === sortModes.unsolvedFirst ? sortModes.roadmap : sortModes.unsolvedFirst;
    render();
  });

  nextUnsolvedButtonEl.addEventListener("click", () => {
    focusNextUnsolvedProblem();
  });

  exportProgressButtonEl.addEventListener("click", () => {
    downloadProgress();
  });

  importProgressButtonEl.addEventListener("click", () => {
    importProgress();
  });

  resetProgressButtonEl.addEventListener("click", () => {
    openResetModal();
  });

  cancelResetButtonEl.addEventListener("click", closeResetModal);
  confirmResetButtonEl.addEventListener("click", () => {
    closeResetModal();
    resetProgress();
  });

  resetModalEl.addEventListener("click", (event) => {
    if (event.target === resetModalEl) {
      closeResetModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !resetModalEl.hidden) {
      closeResetModal();
    }
  });
}

function render() {
  const visibleChapters = getVisibleChapters();
  renderStats(visibleChapters);
  renderChapters(visibleChapters);
  syncUrlState();
}

function getVisibleChapters() {
  return state.chapters.map(filterChapter).filter(Boolean);
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
      return {
        ...section,
        items: sortProblemItems(visibleItems),
      };
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
  const collectionMatches = matchesCollection(problem);
  return sourceMatches && classMatches && searchMatches && collectionMatches;
}

function matchesCollection(problem) {
  if (state.collectionFilter === "roadmap") return true;
  const collection = collectionOptions.find((option) => option.id === state.collectionFilter);
  if (!collection) return true;
  const haystack = `${problem.label} ${problem.url} ${problem.search}`.toLowerCase();
  return (collection.keywords || []).some((keyword) => haystack.includes(keyword.toLowerCase()));
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

function sortProblemItems(items) {
  if (state.sortMode !== sortModes.unsolvedFirst) return items;
  return [...items].sort((a, b) => {
    const aSolved = Boolean(state.completed[a.id]);
    const bSolved = Boolean(state.completed[b.id]);
    if (aSolved !== bSolved) return Number(aSolved) - Number(bSolved);
    return a.label.localeCompare(b.label, "ro");
  });
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
  sortUnsolvedButtonEl.textContent =
    state.sortMode === sortModes.unsolvedFirst ? "Sortare: nerezolvate prime" : "Sortare: roadmap";
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
      const isOpen = state.openChapters.has(chapter.id);
      return `
      <article class="chapter" data-open="${isOpen ? "true" : "false"}" id="${chapter.id}">
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
      const chapterId = button.dataset.chapterToggle;
      if (state.openChapters.has(chapterId)) {
        state.openChapters.delete(chapterId);
        chapterEl.dataset.open = "false";
      } else {
        state.openChapters.add(chapterId);
        chapterEl.dataset.open = "true";
      }
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

function focusNextUnsolvedProblem() {
  const nextProblem = chaptersContainerEl.querySelector(".problem-row[data-completed='false']");
  if (!nextProblem) return;
  nextProblem.scrollIntoView({ behavior: "smooth", block: "center" });
  nextProblem.classList.add("pulse-focus");
  window.setTimeout(() => nextProblem.classList.remove("pulse-focus"), 900);
}

function downloadProgress() {
  const payload = {
    version: 1,
    savedAt: new Date().toISOString(),
    completed: state.completed,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "competitive-programming-checklist-progress.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importProgress() {
  const raw = window.prompt("Lipește JSON-ul exportat pentru progres:");
  if (!raw) return;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    window.alert("JSON-ul nu pare valid.");
    return;
  }

  const completed = parsed && typeof parsed === "object" && parsed.completed && typeof parsed.completed === "object"
    ? parsed.completed
    : parsed;

  if (!completed || typeof completed !== "object") {
    window.alert("Nu am găsit progres valid în conținutul introdus.");
    return;
  }

  if (!window.confirm("Vrei să înlocuiești progresul curent cu progresul importat?")) return;
  state.completed = { ...completed };
  persistCompleted();
  render();
}

function resetProgress() {
  state.completed = {};
  persistCompleted();
  render();
}

function openResetModal() {
  resetModalEl.hidden = false;
  document.body.style.overflow = "hidden";
  cancelResetButtonEl.focus();
}

function closeResetModal() {
  resetModalEl.hidden = true;
  document.body.style.overflow = "";
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
