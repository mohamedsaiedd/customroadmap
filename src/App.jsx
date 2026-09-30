import { useEffect, useRef, useState } from "react";
import { Route } from "lucide-react";

const STORAGE_KEY = "fullstack-roadmap-v2";
const statusOrder = ["todo", "learning", "done"];
const starter = [
  {
    id: "api",
    track: "core",
    title: "Design dependable APIs",
    m1: 1,
    m2: 3,
    sub: "Shape services around clear contracts, useful errors, and safe defaults.",
    learn: [
      [
        "HTTP foundations",
        [
          "Methods and status codes",
          "Headers and content negotiation",
          "Idempotency and safe methods",
          "Caching and ETags",
        ],
      ],
      [
        "API design",
        [
          "Resource modeling and naming",
          "Pagination, filtering and sorting",
          "Authentication and authorization",
          "OpenAPI specifications",
          "Rate limiting and input validation",
        ],
      ],
    ],
    apply: [
      [
        "Build it",
        [
          "Write an API spec before coding",
          "Add cursor pagination to one endpoint",
          "Document one consistent error format",
        ],
      ],
    ],
    links: [
      ["API design guide", "https://roadmap.sh/api-design"],
      ["OWASP API Security", "https://owasp.org/www-project-api-security/"],
    ],
  },
  {
    id: "frontend",
    track: "core",
    title: "Build modern frontend applications",
    m1: 1,
    m2: 4,
    sub: "Create accessible, resilient interfaces that connect cleanly to your APIs.",
    learn: [
      [
        "Web platform",
        [
          "Semantic HTML and accessible forms",
          "CSS layout and responsive design",
          "JavaScript and TypeScript fundamentals",
          "Browser rendering and network requests",
        ],
      ],
      [
        "Application architecture",
        [
          "Component composition and state",
          "Routing and data fetching",
          "Form validation and error states",
          "Design systems and reusable components",
        ],
      ],
      [
        "Quality and performance",
        [
          "Component and browser testing",
          "Keyboard and screen-reader testing",
          "Core Web Vitals",
          "Build tools and code splitting",
        ],
      ],
    ],
    apply: [
      [
        "Build the client",
        [
          "Create a responsive interface for your API",
          "Add loading, empty, and error states",
          "Connect one authenticated workflow",
          "Add one end-to-end browser test",
        ],
      ],
    ],
    links: [
      ["Frontend roadmap", "https://roadmap.sh/frontend"],
      [
        "Web accessibility guide",
        "https://www.w3.org/WAI/standards-guidelines/",
      ],
    ],
  },
  {
    id: "backend",
    track: "core",
    title: "Build a backend service",
    m1: 2,
    m2: 5,
    sub: "Turn the API contract into a structured, testable service.",
    learn: [
      [
        "Service foundations",
        [
          "Modules and dependency injection",
          "Controllers and service layers",
          "Request validation",
          "Configuration and environment handling",
          "Structured logging",
        ],
      ],
      [
        "Reliability",
        [
          "Authentication middleware",
          "Background jobs and queues",
          "Caching strategies",
          "Health checks and graceful shutdown",
        ],
      ],
    ],
    apply: [
      [
        "Implement",
        [
          "Split code into feature modules",
          "Add auth and role-based access",
          "Write unit and end-to-end tests",
          "Queue one slow task",
        ],
      ],
    ],
    links: [
      ["NestJS docs", "https://docs.nestjs.com"],
      ["Node.js roadmap", "https://roadmap.sh/nodejs"],
    ],
  },
  {
    id: "data",
    track: "core",
    title: "Work confidently with data",
    m1: 3,
    m2: 6,
    sub: "Model information carefully, understand query costs, and operate your database.",
    learn: [
      [
        "Relational foundations",
        [
          "Schema design and normalization",
          "Joins, constraints and foreign keys",
          "Indexes and query plans",
          "Transactions and isolation levels",
        ],
      ],
      [
        "Production data",
        [
          "Migrations and safe schema changes",
          "Connection pooling",
          "Redis for cache and sessions",
          "Backups and restore testing",
        ],
      ],
    ],
    apply: [
      [
        "Practice",
        [
          "Draw the project ERD",
          "Find and fix one slow query",
          "Add an index based on query evidence",
          "Test a backup restore",
        ],
      ],
    ],
    links: [
      ["PostgreSQL docs", "https://www.postgresql.org/docs/"],
      ["SQL roadmap", "https://roadmap.sh/sql"],
    ],
  },
  {
    id: "architecture",
    track: "core",
    title: "Make sound architecture decisions",
    m1: 6,
    m2: 9,
    sub: "Choose boundaries and trade-offs that fit the system you actually have.",
    learn: [
      [
        "Structure",
        [
          "Modular monoliths and service boundaries",
          "Layered and hexagonal design",
          "Domain-driven design basics",
          "Monolith versus microservices trade-offs",
        ],
      ],
      [
        "Distributed systems",
        [
          "Consistency and failure modes",
          "Retries and idempotency",
          "Message brokers and event-driven design",
          "Caching and back-pressure",
        ],
      ],
    ],
    apply: [
      [
        "Decide and explain",
        [
          "Diagram your system boundaries",
          "Write three architecture decision records",
          "Design a feed or booking system",
          "Review your trade-offs with a peer",
        ],
      ],
    ],
    links: [["System design roadmap", "https://roadmap.sh/system-design"]],
  },
  {
    id: "delivery",
    track: "infra",
    title: "Infrastructure and DevOps",
    m1: 4,
    m2: 10,
    sub: "Automate delivery, operate reliable infrastructure, and learn from failures.",
    learn: [
      [
        "Delivery",
        [
          "Linux and networking basics",
          "Docker images and Compose",
          "Continuous integration and deployment",
          "Secrets and environment management",
        ],
      ],
      [
        "Operations",
        [
          "Logs, metrics and traces",
          "Health checks and alerting",
          "Cloud fundamentals",
          "Infrastructure as code basics",
        ],
      ],
    ],
    apply: [
      [
        "Run it",
        [
          "Containerize the app and database",
          "Automate tests in CI",
          "Deploy a staging environment",
          "Create a dashboard and one useful alert",
        ],
      ],
    ],
    links: [
      ["DevOps roadmap", "https://roadmap.sh/devops"],
      ["Docker docs", "https://docs.docker.com/"],
    ],
  },
  {
    id: "ai",
    track: "ai",
    title: "Add AI features responsibly",
    m1: 5,
    m2: 11,
    sub: "Build useful AI features with evaluation, safety, and cost in mind.",
    learn: [
      [
        "LLM building blocks",
        [
          "Tokens, context and cost",
          "Structured output and tool calling",
          "Streaming responses",
          "Embeddings and vector search",
        ],
      ],
      [
        "Production quality",
        [
          "Retrieval-augmented generation",
          "Evaluation sets and regression tests",
          "Prompt injection defenses",
          "Latency, tracing and cost controls",
        ],
      ],
    ],
    apply: [
      [
        "Prototype and verify",
        [
          "Add semantic search to your own data",
          "Stream a response to the interface",
          "Create 20 representative evaluation cases",
          "Track cost per request",
        ],
      ],
    ],
    links: [
      ["AI engineer roadmap", "https://roadmap.sh/ai-engineer"],
      [
        "OWASP LLM Top 10",
        "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      ],
    ],
  },
  {
    id: "capstone",
    track: "core",
    title: "Ship a complete capstone",
    m1: 9,
    m2: 12,
    sub: "Connect the pieces in one useful product and show the decisions behind it.",
    learn: [
      [
        "Product engineering",
        [
          "End-to-end types and API clients",
          "Authentication across client and server",
          "Accessible loading and error states",
          "Multi-tenant and payment basics",
        ],
      ],
      [
        "Growing your impact",
        [
          "Design reviews and technical proposals",
          "Owning a service in production",
          "Mentoring and code review",
          "Communicating technical trade-offs",
        ],
      ],
    ],
    apply: [
      [
        "Launch",
        [
          "Build a complete user workflow",
          "Deploy with monitoring and backups",
          "Write public documentation and decisions",
          "Publish a concise project case study",
        ],
      ],
    ],
    links: [["Full-stack roadmap", "https://roadmap.sh/full-stack"]],
  },
];

const startOptions = [
  [
    "frontend",
    "Frontend engineer",
    "You build interfaces and want to own more of the stack.",
  ],
  [
    "backend",
    "Backend engineer",
    "You build services and want to broaden your range.",
  ],
  [
    "fullstack",
    "Full-stack engineer",
    "You work across the stack and want to go deeper.",
  ],
  [
    "new",
    "New to software",
    "You are starting out and want a structured path.",
  ],
];
const goalOptions = [
  ["fullstack", "Full-stack engineer"],
  ["backend", "Backend engineer"],
  ["ai", "AI engineer"],
  ["platform", "Platform engineer"],
];
const stackOptions = [
  [
    "frontend",
    "Frontend",
    "Interfaces, browser fundamentals, testing, and performance.",
  ],
  [
    "backend",
    "Backend",
    "APIs, service structure, authentication, and background work.",
  ],
  [
    "infra",
    "Infrastructure + DevOps",
    "Containers, deployment, cloud, and observability.",
  ],
  [
    "ai",
    "AI engineering",
    "LLM applications, retrieval, evaluation, and safety.",
  ],
];

function defaultStacks(start, goal) {
  return {
    frontend: start !== "frontend" || goal === "fullstack" || goal === "ai",
    backend: start !== "backend" || goal === "fullstack" || goal === "ai",
    infra: goal === "fullstack" || goal === "ai" || goal === "platform",
    ai: goal === "ai" || goal === "fullstack",
  };
}

function makeId() {
  return (
    globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10)
  );
}

function cleanModel(value) {
  if (!value || value.v !== 2 || !Array.isArray(value.phases)) return null;
  const months = Math.min(
    24,
    Math.max(6, Number.parseInt(value.months, 10) || 12),
  );
  const cleanGroups = (groups = []) =>
    (Array.isArray(groups) ? groups : []).map((group) => ({
      id: group.id || makeId(),
      name: String(group.name || "Topics"),
      items: (Array.isArray(group.items) ? group.items : [])
        .map((item) => ({
          id: item.id || makeId(),
          t: String(item.t || ""),
          o: Boolean(item.o),
          s: statusOrder.includes(item.s) ? item.s : "todo",
        }))
        .filter((item) => item.t),
    }));
  return {
    v: 2,
    updatedAt: Number(value.updatedAt) || 0,
    title: String(value.title || "My engineering roadmap"),
    goal: String(value.goal || "Engineering growth"),
    lede: String(
      value.lede || "A practical path, shaped around the work you want to do.",
    ),
    months,
    base: Array.isArray(value.base)
      ? value.base
          .map((item) => ({
            id: item.id || makeId(),
            t: String(item.t || ""),
            o: Boolean(item.o),
            s: statusOrder.includes(item.s) ? item.s : "todo",
          }))
          .filter((item) => item.t)
      : [],
    phases: value.phases.map((phase, index) => ({
      id: phase.id || makeId(),
      track: ["core", "infra", "ai", "extra"].includes(phase.track)
        ? phase.track
        : "core",
      title: String(phase.title || `Phase ${index + 1}`),
      sub: String(phase.sub || ""),
      now: Boolean(phase.now),
      m1: Math.min(months, Math.max(1, Number(phase.m1) || 1)),
      m2: Math.min(months, Math.max(1, Number(phase.m2) || 1)),
      learnTitle: phase.learnTitle || "What to learn",
      applyTitle: phase.applyTitle || "Practice on your project",
      learn: cleanGroups(phase.learn),
      apply: cleanGroups(phase.apply),
      links: Array.isArray(phase.links)
        ? phase.links
            .filter((link) => link?.u?.startsWith("http"))
            .map((link) => ({ l: String(link.l || "Resource"), u: link.u }))
        : [],
    })),
  };
}

function exampleModel() {
  return cleanModel({
    v: 2,
    updatedAt: 0,
    title: "Frontend to full-stack engineer",
    goal: "Full-stack engineer",
    months: 12,
    lede: "A project-led route through APIs, data, architecture, and shipping reliable software.",
    base: [
      "React and TypeScript",
      "Browser fundamentals",
      "Testing and accessibility",
      "Git and code review",
    ].map((t) => ({ id: makeId(), t, s: "done" })),
    phases: starter.map((phase) => ({
      ...phase,
      now: phase.id === "api",
      learnTitle: "What to learn",
      applyTitle: "Build in your project",
      learn: phase.learn.map(([name, items]) => ({
        id: makeId(),
        name,
        items: items.map((t) => ({
          id: makeId(),
          t,
          s:
            phase.id === "api" && t === "Methods and status codes"
              ? "done"
              : "todo",
        })),
      })),
      apply: phase.apply.map(([name, items]) => ({
        id: makeId(),
        name,
        items: items.map((t) => ({ id: makeId(), t, s: "todo" })),
      })),
    })),
  });
}

function createModel({ start, goal, hours, project, stacks }) {
  const months = hours === "5" ? 18 : hours === "15" ? 9 : 12;
  const selected = starter.filter((phase) => {
    if (phase.id === "frontend") return Boolean(stacks?.frontend);
    if (phase.id === "backend") return Boolean(stacks?.backend);
    if (phase.id === "delivery") return Boolean(stacks?.infra);
    if (phase.id === "ai") return Boolean(stacks?.ai);
    if (phase.id === "capstone") return start !== "new";
    return true;
  });
  const scale = months / 12;
  const phases = selected.map((phase, index) => {
    const offset =
      phase.track === "core" ? index * 1.5 : Math.max(3, index * 1.2);
    const m1 = Math.min(
      months,
      Math.max(1, Math.round(phase.m1 * scale + offset * (scale - 1))),
    );
    const m2 = Math.min(months, Math.max(m1, Math.round(phase.m2 * scale)));
    return {
      ...phase,
      id: `p-${makeId()}`,
      m1,
      m2,
      now: false,
      sub: phase.sub,
      applyTitle: project.trim()
        ? `Practice on ${project.trim()}`
        : "Practice on your project",
      learnTitle: "What to learn",
      learn: phase.learn.map(([name, items]) => ({
        id: makeId(),
        name,
        items: items.map((t) => ({ id: makeId(), t, s: "todo" })),
      })),
      apply: phase.apply.map(([name, items]) => ({
        id: makeId(),
        name,
        items: items.map((t) => ({ id: makeId(), t, s: "todo" })),
      })),
    };
  });
  if (phases.length) phases[0].now = true;
  const goalName =
    goalOptions.find(([id]) => id === goal)?.[1] || "Engineering growth";
  const startName =
    startOptions.find(([id]) => id === start)?.[1] || "Engineer";
  return cleanModel({
    v: 2,
    updatedAt: 0,
    title:
      start === "new"
        ? `Your path to ${goalName}`
        : `${startName} to ${goalName}`,
    goal: goalName,
    months,
    lede: `A practical, project-led route from ${startName.toLowerCase()} toward ${goalName.toLowerCase()}.`,
    base: [],
    phases,
  });
}

function allItems(phase) {
  return [...phase.learn, ...phase.apply].flatMap((group) => group.items);
}

function downloadModel(model) {
  const blob = new Blob([JSON.stringify(model, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${model.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "roadmap"}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function Topic({
  item,
  onCycle,
  editing,
  onEdit,
  groupId,
  onTopicDragStart,
  onTopicDrop,
  onTopicDragEnd,
}) {
  return (
    <button
      className={`topic status-${item.s}${item.o ? " optional" : ""}${editing ? " is-draggable" : ""}`}
      type="button"
      draggable={editing}
      onClick={() => (editing ? onEdit() : onCycle())}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", item.id);
        event.currentTarget.classList.add("dragging-topic");
        onTopicDragStart(item.id, groupId);
      }}
      onDragEnd={(event) => {
        event.currentTarget.classList.remove("dragging-topic");
        document
          .querySelectorAll(".topic.drop-target")
          .forEach((topic) => topic.classList.remove("drop-target"));
        onTopicDragEnd();
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const bounds = event.currentTarget.getBoundingClientRect();
        onTopicDrop(
          item.id,
          groupId,
          event.clientX > bounds.left + bounds.width / 2,
        );
      }}
      onDragOver={(event) => {
        if (editing) {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
          document
            .querySelectorAll(".topic.drop-target")
            .forEach((topic) => topic.classList.remove("drop-target"));
          event.currentTarget.classList.add("drop-target");
        }
      }}
      aria-label={`${item.t}, ${item.s}. ${editing ? "Edit or drag topic" : "Change status"}`}
    >
      <span className="topic-mark" aria-hidden="true">
        {item.s === "done" ? "✓" : item.s === "learning" ? "◒" : ""}
      </span>
      <span>{item.t}</span>
      {item.o && <span className="optional-label">Optional</span>}
    </button>
  );
}

function Phase({
  phase,
  index,
  editing,
  onCycle,
  onEditTopic,
  onEditPhase,
  onMove,
  onTopicDragStart,
  onTopicDrop,
  onTopicDragEnd,
}) {
  const counts = allItems(phase).reduce(
    (result, item) => {
      result.total += 1;
      if (item.s === "done") result.done += 1;
      if (item.s === "learning") result.learning += 1;
      return result;
    },
    { total: 0, done: 0, learning: 0 },
  );
  const progress = counts.total
    ? Math.round((counts.done / counts.total) * 100)
    : 0;
  const phaseStatus =
    counts.total > 0 && counts.done === counts.total
      ? "done"
      : counts.done > 0 || counts.learning > 0
        ? "learning"
        : "todo";

  return (
    <article className={`phase track-${phase.track}`} id={phase.id}>
      <span
        className={`phase-index status-${phaseStatus}`}
        aria-label={`${phase.title}: ${phaseStatus}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <header className="phase-head">
        <div className="phase-heading">
          <div className="phase-kicker">
            {phase.track} · month {phase.m1}
            {phase.m2 !== phase.m1 && `–${phase.m2}`}
          </div>
          <h3>{phase.title}</h3>
          <p>{phase.sub}</p>
          <div className="phase-progress">
            <span>
              {counts.done} / {counts.total} complete
            </span>
            <span>
              {counts.learning
                ? `${counts.learning} in progress`
                : `${progress}%`}
            </span>
            <i>
              <b style={{ width: `${progress}%` }} />
            </i>
          </div>
          {phase.now && <span className="current-flag">CURRENT FOCUS</span>}
        </div>
        <div className="phase-actions">
          {editing && (
            <>
              <button
                className="icon-button"
                title="Move phase up"
                aria-label="Move phase up"
                onClick={() => onMove(-1)}
              >
                ↑
              </button>
              <button
                className="icon-button"
                title="Move phase down"
                aria-label="Move phase down"
                onClick={() => onMove(1)}
              >
                ↓
              </button>
            </>
          )}
          <button className="text-button" onClick={onEditPhase}>
            Edit
          </button>
        </div>
      </header>
      <div className="phase-columns">
        <PhaseColumn
          title={phase.learnTitle || "What to learn"}
          groups={phase.learn}
          editing={editing}
          onCycle={onCycle}
          onEditTopic={onEditTopic}
          onTopicDragStart={onTopicDragStart}
          onTopicDrop={onTopicDrop}
          onTopicDragEnd={onTopicDragEnd}
        />
        <PhaseColumn
          title={phase.applyTitle || "Practice on your project"}
          groups={phase.apply}
          editing={editing}
          onCycle={onCycle}
          onEditTopic={onEditTopic}
          onTopicDragStart={onTopicDragStart}
          onTopicDrop={onTopicDrop}
          onTopicDragEnd={onTopicDragEnd}
        />
      </div>
      {phase.links.length > 0 && (
        <div className="resource-row">
          <span>REFERENCE</span>
          {phase.links.map((link) => (
            <a key={link.u} href={link.u} target="_blank" rel="noreferrer">
              {link.l} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function PhaseColumn({
  title,
  groups,
  editing,
  onCycle,
  onEditTopic,
  onTopicDragStart,
  onTopicDrop,
  onTopicDragEnd,
}) {
  return (
    <section className="phase-column">
      <h4>{title}</h4>
      {groups.map((group) => (
        <div className="topic-group" key={group.id}>
          <h5>{group.name}</h5>
          <div
            className="topic-list"
            onDragOver={(event) => {
              if (editing) event.preventDefault();
            }}
            onDrop={(event) => {
              if (editing && event.target === event.currentTarget) {
                event.preventDefault();
                onTopicDrop(null, group.id, true);
              }
            }}
          >
            {group.items.map((item) => (
              <Topic
                key={item.id}
                item={item}
                groupId={group.id}
                editing={editing}
                onCycle={() => onCycle(item)}
                onEdit={() => onEditTopic(item)}
                onTopicDragStart={onTopicDragStart}
                onTopicDrop={onTopicDrop}
                onTopicDragEnd={onTopicDragEnd}
              />
            ))}
          </div>
          {editing && (
            <button
              className="add-inline"
              onClick={() => onEditTopic(null, group)}
            >
              + Add topic
            </button>
          )}
        </div>
      ))}
    </section>
  );
}

function SetupDialog({ onClose, onCreate }) {
  const [start, setStart] = useState("frontend");
  const [goal, setGoal] = useState("fullstack");
  const [hours, setHours] = useState("10");
  const [project, setProject] = useState("");
  const [stacks, setStacks] = useState(() =>
    defaultStacks("frontend", "fullstack"),
  );
  useEffect(() => setStacks(defaultStacks(start, goal)), [start, goal]);
  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="dialog setup-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="setup-title"
      >
        <button className="dialog-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="eyebrow">MAKE IT YOURS · 01 / 03</div>
        <h2 id="setup-title">Choose your next chapter.</h2>
        <p className="dialog-lede">
          We’ll make a starting plan from your goal. Every part stays editable.
        </p>
        <label className="field">
          <span>Where are you starting?</span>
          <select
            value={start}
            onChange={(event) => setStart(event.target.value)}
          >
            {startOptions.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>What are you working toward?</span>
          <select
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          >
            {goalOptions.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="stack-picker">
          <legend>Include learning stacks</legend>
          {stackOptions.map(([id, label, description]) => (
            <label className="stack-option" key={id}>
              <input
                type="checkbox"
                checked={stacks[id]}
                onChange={(event) =>
                  setStacks((current) => ({
                    ...current,
                    [id]: event.target.checked,
                  }))
                }
              />
              <span>
                <b>{label}</b>
                <small>{description}</small>
              </span>
            </label>
          ))}
        </fieldset>
        <label className="field">
          <span>Time you can give each week</span>
          <select
            value={hours}
            onChange={(event) => setHours(event.target.value)}
          >
            <option value="5">Around 5 hours</option>
            <option value="10">Around 10 hours</option>
            <option value="15">15 hours or more</option>
          </select>
        </label>
        <label className="field">
          <span>
            A project to practice on <small>Optional</small>
          </span>
          <input
            value={project}
            maxLength={60}
            placeholder="For example, a meal planning app"
            onChange={(event) => setProject(event.target.value)}
          />
        </label>
        <div className="dialog-footer">
          <button className="button secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="button primary"
            onClick={() => onCreate({ start, goal, hours, project, stacks })}
          >
            Build my roadmap <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function EditorDialog({ editor, onClose, onSave, onDelete }) {
  const [values, setValues] = useState(editor.values);
  const [deleteArmed, setDeleteArmed] = useState(false);
  const change = (name, value) =>
    setValues((current) => ({ ...current, [name]: value }));
  const title =
    editor.kind === "topic"
      ? editor.item
        ? "Edit topic"
        : "Add topic"
      : editor.kind === "settings"
        ? "Roadmap settings"
        : editor.phase
          ? "Edit phase"
          : "Add a phase";

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        className="dialog editor-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(values);
        }}
      >
        <button
          className="dialog-close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="eyebrow">ROADMAP EDITOR</div>
        <h2 id="editor-title">{title}</h2>
        {editor.kind === "topic" && (
          <>
            <label className="field">
              <span>Topic</span>
              <input
                autoFocus
                value={values.title}
                maxLength={200}
                onChange={(event) => change("title", event.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>Status</span>
              <select
                value={values.status}
                onChange={(event) => change("status", event.target.value)}
              >
                <option value="todo">Not started</option>
                <option value="learning">In progress</option>
                <option value="done">Done</option>
              </select>
            </label>
            <label className="check-field">
              <input
                type="checkbox"
                checked={values.optional}
                onChange={(event) => change("optional", event.target.checked)}
              />{" "}
              Optional, pick by need
            </label>
          </>
        )}
        {editor.kind === "phase" && (
          <>
            <label className="field">
              <span>Phase title</span>
              <input
                autoFocus
                value={values.title}
                maxLength={140}
                onChange={(event) => change("title", event.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>Short description</span>
              <textarea
                rows="3"
                value={values.sub}
                onChange={(event) => change("sub", event.target.value)}
              />
            </label>
            <label className="field">
              <span>Track</span>
              <select
                value={values.track}
                onChange={(event) => change("track", event.target.value)}
              >
                <option value="core">Core route</option>
                <option value="infra">Infra track</option>
                <option value="ai">AI track</option>
                <option value="extra">Other track</option>
              </select>
            </label>
            <div className="field-pair">
              <label className="field">
                <span>Starts in month</span>
                <input
                  type="number"
                  min="1"
                  max={editor.months}
                  value={values.m1}
                  onChange={(event) => change("m1", event.target.value)}
                />
              </label>
              <label className="field">
                <span>Ends in month</span>
                <input
                  type="number"
                  min="1"
                  max={editor.months}
                  value={values.m2}
                  onChange={(event) => change("m2", event.target.value)}
                />
              </label>
            </div>
          </>
        )}
        {editor.kind === "settings" && (
          <>
            <label className="field">
              <span>Roadmap title</span>
              <input
                autoFocus
                value={values.title}
                maxLength={140}
                onChange={(event) => change("title", event.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>Destination</span>
              <input
                value={values.goal}
                maxLength={80}
                onChange={(event) => change("goal", event.target.value)}
              />
            </label>
            <label className="field">
              <span>Introduction</span>
              <textarea
                rows="3"
                value={values.lede}
                maxLength={500}
                onChange={(event) => change("lede", event.target.value)}
              />
            </label>
            <label className="field">
              <span>Timeline length (months)</span>
              <input
                type="number"
                min="6"
                max="24"
                value={values.months}
                onChange={(event) => change("months", event.target.value)}
              />
            </label>
          </>
        )}
        <div className="dialog-footer editor-footer">
          {onDelete && (
            <button
              className="button secondary danger-button"
              type="button"
              onClick={() => {
                if (deleteArmed) onDelete();
                else setDeleteArmed(true);
              }}
            >
              {deleteArmed ? "Confirm delete" : "Delete"}
            </button>
          )}
          <span className="footer-spacer" />
          <button className="button secondary" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="button primary" type="submit">
            {editor.kind === "topic" && !editor.item
              ? "Add topic"
              : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("roadmap-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [model, setModel] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return cleanModel(JSON.parse(stored)) || exampleModel();
    } catch {
      /* Use the starter plan if storage is unavailable. */
    }
    return exampleModel();
  });
  const [editing, setEditing] = useState(false);
  const [setupOpen, setSetupOpen] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });
  const [editor, setEditor] = useState(null);
  const [saveLabel, setSaveLabel] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY)
        ? "Saved in this browser"
        : "Starter roadmap · edits save automatically";
    } catch {
      return "Starter roadmap · edits save automatically";
    }
  });
  const importRef = useRef(null);
  const draggedTopic = useRef(null);
  const initialSave = useRef(true);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("roadmap-theme", theme);
    } catch {
      /* Theme remains active for this session. */
    }
  }, [theme]);

  useEffect(() => {
    if (initialSave.current) {
      initialSave.current = false;
      return;
    }
    const next = { ...model, updatedAt: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaveLabel("All changes saved");
    } catch {
      setSaveLabel("Could not save in this browser");
    }
  }, [model]);

  const updateModel = (updater) =>
    setModel((current) => cleanModel(updater(structuredClone(current))));
  const cycleItem = (item) =>
    updateModel((next) => {
      const found = [...next.base, ...next.phases.flatMap(allItems)].find(
        (candidate) => candidate.id === item.id,
      );
      if (found)
        found.s =
          statusOrder[(statusOrder.indexOf(found.s) + 1) % statusOrder.length];
      return next;
    });
  const startTopicDrag = (itemId, groupId) => {
    draggedTopic.current = { itemId, groupId };
  };
  const endTopicDrag = () => {
    draggedTopic.current = null;
  };
  const dropTopic = (targetItemId, targetGroupId, after) => {
    const source = draggedTopic.current;
    draggedTopic.current = null;
    if (!source || source.itemId === targetItemId) return;
    updateModel((next) => {
      const groups = next.phases.flatMap((phase) => [
        ...phase.learn,
        ...phase.apply,
      ]);
      const listFor = (groupId) =>
        groupId === "base"
          ? next.base
          : groups.find((group) => group.id === groupId)?.items;
      const from = listFor(source.groupId);
      const to = listFor(targetGroupId);
      if (!from || !to) return next;
      const sourceIndex = from.findIndex((item) => item.id === source.itemId);
      if (sourceIndex < 0) return next;
      const [moving] = from.splice(sourceIndex, 1);
      let targetIndex = targetItemId
        ? to.findIndex((item) => item.id === targetItemId)
        : to.length;
      if (targetIndex < 0) targetIndex = to.length;
      if (targetItemId && after) targetIndex += 1;
      to.splice(Math.min(targetIndex, to.length), 0, moving);
      return next;
    });
  };
  const editTopic = (item, group) =>
    setEditor({
      kind: "topic",
      item,
      group,
      values: {
        title: item?.t || "",
        status: item?.s || "todo",
        optional: item?.o || false,
      },
    });
  const editPhase = (phase) =>
    setEditor({
      kind: "phase",
      phase,
      months: model.months,
      values: {
        title: phase.title,
        sub: phase.sub,
        track: phase.track,
        m1: phase.m1,
        m2: phase.m2,
      },
    });
  const addPhase = () =>
    setEditor({
      kind: "phase",
      phase: null,
      months: model.months,
      values: {
        title: "",
        sub: "",
        track: "core",
        m1: 1,
        m2: Math.min(model.months, 3),
      },
    });
  const editSettings = () =>
    setEditor({
      kind: "settings",
      values: {
        title: model.title,
        goal: model.goal,
        lede: model.lede,
        months: model.months,
      },
    });
  const saveEditor = (values) => {
    if (editor.kind === "topic") {
      if (!values.title.trim()) return;
      updateModel((next) => {
        const items = [...next.base, ...next.phases.flatMap(allItems)];
        if (editor.item) {
          const target = items.find((item) => item.id === editor.item.id);
          if (target)
            Object.assign(target, {
              t: values.title.trim(),
              s: values.status,
              o: values.optional,
            });
        } else {
          const targetGroup = next.phases
            .flatMap((phase) => [...phase.learn, ...phase.apply])
            .find((group) => group.id === editor.group?.id);
          targetGroup?.items.push({
            id: makeId(),
            t: values.title.trim(),
            s: values.status,
            o: values.optional,
          });
        }
        return next;
      });
    } else if (editor.kind === "phase") {
      if (!values.title.trim()) return;
      updateModel((next) => {
        const existing =
          editor.phase &&
          next.phases.find((phase) => phase.id === editor.phase.id);
        const monthStart = Math.min(
          next.months,
          Math.max(1, Number(values.m1) || 1),
        );
        const monthEnd = Math.min(
          next.months,
          Math.max(monthStart, Number(values.m2) || monthStart),
        );
        if (existing)
          Object.assign(existing, {
            title: values.title.trim(),
            sub: values.sub.trim(),
            track: values.track,
            m1: monthStart,
            m2: monthEnd,
          });
        else
          next.phases.push({
            id: makeId(),
            track: values.track,
            title: values.title.trim(),
            sub: values.sub.trim(),
            now: false,
            m1: monthStart,
            m2: monthEnd,
            learnTitle: "What to learn",
            applyTitle: "Practice on your project",
            learn: [{ id: makeId(), name: "Topics", items: [] }],
            apply: [{ id: makeId(), name: "Practice", items: [] }],
            links: [],
          });
        return next;
      });
    } else {
      const months = Math.min(
        24,
        Math.max(6, Number.parseInt(values.months, 10) || 12),
      );
      updateModel((next) => {
        next.title = values.title.trim() || next.title;
        next.goal = values.goal.trim() || next.goal;
        next.lede = values.lede.trim();
        next.months = months;
        next.phases.forEach((phase) => {
          phase.m1 = Math.min(phase.m1, months);
          phase.m2 = Math.max(phase.m1, Math.min(phase.m2, months));
        });
        return next;
      });
    }
    setEditor(null);
  };
  const deleteEditorTarget = () => {
    updateModel((next) => {
      if (editor.kind === "topic") {
        next.base = next.base.filter((item) => item.id !== editor.item.id);
        next.phases.forEach((phase) =>
          [...phase.learn, ...phase.apply].forEach((group) => {
            group.items = group.items.filter(
              (item) => item.id !== editor.item.id,
            );
          }),
        );
      } else if (editor.phase)
        next.phases = next.phases.filter(
          (phase) => phase.id !== editor.phase.id,
        );
      return next;
    });
    setEditor(null);
  };
  const movePhase = (phase, direction) =>
    updateModel((next) => {
      const index = next.phases.findIndex((entry) => entry.id === phase.id);
      const target = index + direction;
      if (target >= 0 && target < next.phases.length)
        [next.phases[index], next.phases[target]] = [
          next.phases[target],
          next.phases[index],
        ];
      return next;
    });
  const importBackup = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = cleanModel(JSON.parse(await file.text()));
      if (!imported) throw new Error("This file is not a roadmap backup.");
      if (window.confirm("Replace your current roadmap with this backup?"))
        setModel(imported);
    } catch (error) {
      setSaveLabel(error.message || "Could not read this roadmap file");
    }
    event.target.value = "";
  };

  const totals = model.phases.flatMap(allItems).reduce(
    (result, item) => {
      result.total += 1;
      if (item.s === "done") result.done += 1;
      if (item.s === "learning") result.learning += 1;
      return result;
    },
    { total: 0, done: 0, learning: 0 },
  );
  const focusItems = model.phases
    .flatMap(allItems)
    .filter((item) => item.s === "learning");
  const progress = totals.total
    ? Math.round((totals.done / totals.total) * 100)
    : 0;

  return (
    <main className="app-shell">
      <nav className="topbar">
        <a className="wordmark" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 26C8 25.5 10.5 23 12 13L19 32.5L26  18"
                stroke="#1d5eb3"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="5" cy="26" r="4" fill="#1d5eb3" />
            </svg>
          </span>
          customroadmap
        </a>
        <div className="topbar-right">
          <span className="save-status">
            <i />
            {saveLabel}
          </span>
          <button
            className="button secondary compact theme-toggle"
            onClick={() =>
              setTheme((current) => (current === "dark" ? "light" : "dark"))
            }
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☼ Light" : "◐ Dark"}
          </button>
          <button
            className="button secondary compact"
            onClick={() => setEditing((value) => !value)}
          >
            {editing ? "Finish editing" : "Edit roadmap"}
          </button>
        </div>
      </nav>
      <header className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">YOUR NEXT CHAPTER, IN VIEW</div>
          <h1>
            {model.title}
            <span>.</span>
          </h1>
          <p>{model.lede}</p>
          <div className="hero-actions">
            <button
              className="button primary"
              onClick={() =>
                document
                  .getElementById("roadmap")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Continue your path <span aria-hidden="true">↓</span>
            </button>
            <button
              className="button text-button"
              onClick={() => setSetupOpen(true)}
            >
              Start a new roadmap
            </button>
          </div>
        </div>
        <aside className="overview" aria-label="Roadmap progress">
          <div className="overview-top">
            <span>YOUR PROGRESS</span>
            <strong>
              {progress}
              <small>%</small>
            </strong>
          </div>
          <div className="progress-track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <div className="overview-stats">
            <div>
              <strong>{totals.done}</strong>
              <span>Done</span>
            </div>
            <div>
              <strong>{totals.learning}</strong>
              <span>In progress</span>
            </div>
            <div>
              <strong>{totals.total - totals.done - totals.learning}</strong>
              <span>Up next</span>
            </div>
          </div>
          <p className="overview-foot">
            {model.months} months <span>·</span> {model.goal}
          </p>
        </aside>
      </header>
      <section className="toolbar" aria-label="Roadmap actions">
        <div>
          <span className="section-index">01</span>
          <span className="toolbar-caption">YOUR ROADMAP</span>
        </div>
        <div className="toolbar-actions">
          <button className="text-button" onClick={() => downloadModel(model)}>
            ↓ Export backup
          </button>
          <button
            className="text-button"
            onClick={() => importRef.current?.click()}
          >
            ↑ Restore backup
          </button>
          <button
            className="button secondary compact"
            onClick={() => setSetupOpen(true)}
          >
            ＋ New roadmap
          </button>
          <input
            ref={importRef}
            className="sr-only"
            type="file"
            accept="application/json,.json"
            onChange={importBackup}
          />
        </div>
      </section>
      <section
        className="timeline"
        aria-label={`${model.months}-month roadmap timeline`}
        style={{ "--months": model.months }}
      >
        <div className="timeline-label">
          MILESTONES <span>MONTHS FROM TODAY</span>
        </div>
        <div className="timeline-months">
          {Array.from({ length: model.months }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        {model.phases.map((phase, index) => (
          <a
            className={`timeline-row track-${phase.track}`}
            href={`#${phase.id}`}
            key={phase.id}
          >
            <span className="timeline-title">
              {String(index + 1).padStart(2, "0")} <b>{phase.title}</b>
            </span>
            <span className="timeline-lane">
              <i
                style={{
                  left: `${((phase.m1 - 1) / model.months) * 100}%`,
                  width: `${((phase.m2 - phase.m1 + 1) / model.months) * 100}%`,
                }}
              />
            </span>
          </a>
        ))}
        {editing && (
          <button className="timeline-edit" onClick={editSettings}>
            Edit roadmap title and settings <span>↗</span>
          </button>
        )}
      </section>
      <section className="focus-strip">
        <div className="focus-symbol" aria-hidden="true">
          <Route size={22} strokeWidth={1.8} />
        </div>
        <div>
          <div className="eyebrow">IN MOTION</div>
          <h2>
            {focusItems.length
              ? `${focusItems.length} topic${focusItems.length === 1 ? "" : "s"} underway`
              : "Pick one thing to begin"}
          </h2>
          <p>
            {focusItems.length
              ? focusItems
                  .slice(0, 3)
                  .map((item) => item.t)
                  .join(" · ")
              : "Mark a topic as in progress when you start working on it."}
          </p>
        </div>
        <a href="#roadmap">
          See your path <span>↓</span>
        </a>
      </section>
      <section className="roadmap-section" id="roadmap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">A PLAN THAT MOVES WITH YOU</div>
            <h2>The learning path</h2>
          </div>
          <div className="status-key">
            <span>
              <i className="key-todo" />
              Next up
            </span>
            <span>
              <i className="key-learning" />
              In progress
            </span>
            <span>
              <i className="key-done" />
              Done
            </span>
          </div>
        </div>
        {model.base.length > 0 && (
          <section className="starting-point">
            <span className="eyebrow">ALREADY IN YOUR TOOLKIT</span>
            <div
              className="base-topic-list"
              onDragOver={(event) => {
                if (editing) event.preventDefault();
              }}
              onDrop={(event) => {
                if (editing && event.target === event.currentTarget) {
                  event.preventDefault();
                  dropTopic(null, "base", true);
                }
              }}
            >
              {model.base.map((item) => (
                <Topic
                  key={item.id}
                  item={item}
                  groupId="base"
                  editing={editing}
                  onCycle={() => cycleItem(item)}
                  onEdit={() => editTopic(item)}
                  onTopicDragStart={startTopicDrag}
                  onTopicDrop={dropTopic}
                  onTopicDragEnd={endTopicDrag}
                />
              ))}
            </div>
          </section>
        )}
        <div className="phase-list">
          {model.phases.map((phase, index) => (
            <Phase
              key={phase.id}
              phase={phase}
              index={index}
              editing={editing}
              onCycle={cycleItem}
              onEditTopic={editTopic}
              onEditPhase={() => editPhase(phase)}
              onMove={(direction) => movePhase(phase, direction)}
              onTopicDragStart={startTopicDrag}
              onTopicDrop={dropTopic}
              onTopicDragEnd={endTopicDrag}
            />
          ))}
        </div>
        {editing && (
          <button className="add-phase" onClick={addPhase}>
            <span>＋</span> Add a phase
          </button>
        )}
      </section>
      <footer className="footer">
        <a className="wordmark" href="#top">
           <span className="brand-mark" aria-hidden="true">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 26C8 25.5 10.5 23 12 13L19 32.5L26  18"
                stroke="#1d5eb3"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="5" cy="26" r="4" fill="#1d5eb3" />
            </svg>
          </span>
          customroadmap
        </a>
        <span>Your path, your pace.</span>
        <button className="text-button" onClick={() => downloadModel(model)}>
          Download your roadmap ↗
        </button>
      </footer>
      {setupOpen && (
        <SetupDialog
          onClose={() => setSetupOpen(false)}
          onCreate={(answers) => {
            setModel(createModel(answers));
            setSetupOpen(false);
            setEditing(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
      {editor && (
        <EditorDialog
          key={`${editor.kind}-${editor.item?.id || editor.phase?.id || "new"}`}
          editor={editor}
          onClose={() => setEditor(null)}
          onSave={saveEditor}
          onDelete={editor.item ? deleteEditorTarget : null}
        />
      )}
    </main>
  );
}

export default App;
