/**
 * Single source of truth for site content.
 * Components render this; nothing else hardcodes copy.
 */

export const profile = {
  name: 'Faizan Ansari',
  role: 'Lead Software Developer',
  company: 'Plasma',
  location: 'Dallas–Fort Worth, TX',
  email: 'faizanansari1220@gmail.com',
  resume: '/documents/Faizan-Ansari-Resume.pdf',
  github: 'https://github.com/faizanans',
  linkedin: 'https://www.linkedin.com/in/faizanansari786/',
  headline: 'I build backend systems that move data in real time.',
  summary:
    'Event-driven services in Java and Spring Boot, Kafka, Redis, Apache Druid, MySQL designed to be operated, not just launched. Nine years in technology, six of them writing production backends, and currently leading the engineering team that ships them.',
} as const;

/** Headline figures. */
export interface Stat {
  value: string;
  label: string;
}

export const stats: readonly Stat[] = [
  { value: '9+', label: 'Years in tech' },
  { value: '3', label: 'IT Support' },
  { value: '6', label: 'Years backend engineering' },
  { value: 'B.S.', label: 'Software Engineering, UTD' },
];

/**
 * What I build. The spine of the page: each capability names the work, what
 * it involves, and the concrete pieces that come out of it.
 */
export interface Capability {
  title: string;
  body: string;
  deliverables: readonly string[];
  art: string;
}

export const capabilities: readonly Capability[] = [
  {
    title: 'Backend & API development',
    body: 'The engine behind a product: a documented API, a data model that holds up, and the business logic the operation actually runs on.',
    deliverables: ['REST APIs', 'Database design', 'Auth & permissions', 'Deployment setup'],
    art: '/illustrations/server_9eix.svg',
  },
  {
    title: 'Event-driven systems',
    body: 'Systems that talk to each other in real time instead of in nightly batches — Kafka pipelines with throughput budgets and explicit failure handling.',
    deliverables: ['Event pipelines', 'Service integration', 'Scheduled jobs', 'Data sync'],
    art: '/illustrations/collaborating_mayd.svg',
  },
  {
    title: 'Data & analytics platforms',
    body: 'High-volume ingestion and the reporting layer on top of it, built on the same Druid and Redis stack I run at scale day to day.',
    deliverables: ['Ingestion pipeline', 'Analytics store', 'Dashboards', 'Alerting & export'],
    art: '/illustrations/visualization_zhab.svg',
  },
  {
    title: 'Full-stack web applications',
    body: 'An internal tool or a customer facing product built whole — React on the front, Spring Boot behind it, shipped to a URL that stays up.',
    deliverables: ['React frontend', 'Backend services', 'CI/CD & hosting', 'Handover docs'],
    art: '/illustrations/programming_65t2.svg',
  },
];

/** How the work gets done. */
export interface Principle {
  title: string;
  body: string;
}

export const approach: readonly Principle[] = [
  {
    title: 'Scope before code',
    body: 'What gets built and what explicitly does not, written down in plain language first. Every disagreement is cheaper here than it is in a pull request.',
  },
  {
    title: 'Built to be operated',
    body: 'A service is finished when someone else can diagnose it at 3am, structured logs, honest health checks, and failure paths written before the happy path.',
  },
  {
    title: 'Reviewed to teach',
    body: 'The comment that explains the reasoning is worth more than the one that only blocks the merge.',
  },
  {
    title: 'Handed over documented',
    body: 'The repository, the deployment, and the reasoning behind both. Nothing important should live only in the head of whoever wrote it.',
  },
];

/** Career timeline, newest first. */
export interface Role {
  title: string;
  org: string;
  start: string;
  end: string;
  location: string;
  current?: boolean;
  bullets: readonly string[];
  stack: readonly string[];
}

export const roles: readonly Role[] = [
  {
    title: 'Lead Software Developer',
    org: 'Plasma',
    start: 'Jan 2023',
    end: 'Present',
    location: 'Irving, TX',
    current: true,
    bullets: [
      'Lead backend development for production applications built on Java, Spring Boot, and MySQL.',
      "Manage the engineering team's delivery code reviews, technical direction, and mentoring.",
      'Design data and messaging flows with Redis, Kafka, and Apache Druid for high-volume, event-driven workloads.',
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'Druid', 'MySQL'],
  },
  {
    title: 'Software Developer',
    org: 'MicroAI Plasma',
    start: 'Mar 2020',
    end: 'Dec 2022',
    location: 'Irving, TX',
    bullets: [
      'Built and maintained backend services with Spring and Spring Boot, using Java, Redis, Kafka, Druid, and MySQL.',
      'Developed event-driven workflows that integrated processes across multiple systems.',
      'Worked directly with project managers across business units to plan and deliver key projects.',
      'Practiced a disciplined SDLC on an Agile cadence to ship reliably and on time.',
    ],
    stack: ['Java', 'Spring', 'Kafka', 'Druid', 'MySQL'],
  },
  {
    title: 'I.T. Technician',
    org: 'JCPenney Head Office',
    start: 'Nov 2016',
    end: 'Jan 2020',
    location: 'Plano, TX',
    bullets: [
      'Single point of contact for technology support across the head office — network, email, operating systems, hardware, and mainframe/midrange operations.',
      'Diagnosed, resolved, and documented technical issues in Remedy, and contributed to the internal knowledge base.',
    ],
    stack: ['Networking', 'Mainframe', 'Remedy'],
  },
  {
    title: 'Technical Sales Intern',
    org: 'Cisco Systems',
    start: 'May 2016',
    end: 'Aug 2016',
    location: 'San Jose, CA',
    bullets: [
      'Worked hands-on with NX-OS on Nexus 9000 switches and wrote Python scripts to automate switch configuration.',
      'Trained Cisco partners on the NX-OS environment and supported solution recommendations.',
    ],
    stack: ['NX-OS', 'Python', 'Nexus 9000'],
  },
];

export const education = {
  degree: 'B.S. in Software Engineering',
  school: 'The University of Texas at Dallas',
  start: 'Aug 2015',
  end: 'Dec 2019',
  location: 'Richardson, TX',
} as const;

/** Selected work. */
export interface Project {
  name: string;
  tagline: string;
  body: string;
  stack: readonly string[];
  highlights: readonly string[];
  video?: string;
  /** First frame, shown until the visitor presses play. */
  poster?: string;
  repo?: string;
}

export const projects: readonly Project[] = [
  {
    name: 'QuickMsg',
    tagline: 'Real-time messaging platform',
    body: 'A Spring Boot 3 backend routes messages over persistent WebSocket connections while a React frontend provides the chat interface. Built to explore low-latency, connection-heavy backend design end to end.',
    stack: ['Spring Boot 3', 'WebSocket', 'React', 'Lombok'],
    highlights: [
      'Live messaging over WebSocket — instant transmission with no polling.',
      'Create and join multiple channels, with connection state managed server-side.',
      'Architecture kept deliberately lean so it scales out as channels and users grow.',
    ],
    video: '/projects/quickmsg/video/demo.mp4',
    poster: '/projects/quickmsg/poster.jpg',
  },
];

/** Skills, grouped. */
export interface SkillGroup {
  label: string;
  items: readonly string[];
}

export const skills: readonly SkillGroup[] = [
  { label: 'Languages', items: ['Java', 'Go', 'Python', 'SQL'] },
  {
    label: 'Backend',
    items: ['Spring Boot', 'Spring', 'REST APIs', 'Event-driven architecture'],
  },
  { label: 'Data & messaging', items: ['Kafka', 'Redis', 'Apache Druid', 'MySQL'] },
  { label: 'Platform', items: ['Docker', 'Kubernetes', 'CI/CD', 'Git'] },
];

/** Sticky-nav sections. Order defines both nav order and scroll-spy order. */
export interface NavSection {
  id: string;
  label: string;
}

export const navSections: readonly NavSection[] = [
  { id: 'build', label: 'What I build' },
  { id: 'approach', label: 'Approach' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
];
