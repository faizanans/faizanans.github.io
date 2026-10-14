/**
 * Single source of truth for site content.
 * Components render this; nothing else hardcodes copy.
 */

export const profile = {
  name: 'Faizan Ansari',
  role: 'Lead Software Developer',
  focus: 'Backend & distributed systems',
  company: 'Plasma',
  location: 'Dallas–Fort Worth, TX',
  email: 'faizanansari1220@gmail.com',
  resume: '/documents/Faizan-Ansari-Resume.pdf',
  github: 'https://github.com/faizanans',
  linkedin: 'https://www.linkedin.com/in/faizanansari786/',
  summary:
    'I design and run event-driven services in Java and Spring Boot on Kafka, Redis, Apache Druid and MySQL. I build them so other people can operate them, not just launch them. I have spent six years writing production backends, and today I lead the engineering team that ships them.',
} as const;

/** Headline figures shown under the hero. */
export interface Stat {
  value: string;
  label: string;
}

export const stats: readonly Stat[] = [
  { value: '6+', label: 'Years building production backends' },
  { value: '3+', label: 'Years leading an engineering team' },
  { value: '9+', label: 'Years in technology' },
  { value: 'B.S.', label: 'Software Engineering, UT Dallas' },
];

/** What I build. Each names the work and the concrete pieces that come out of it. */
export type IconName = 'server' | 'stream' | 'chart' | 'layers';

export interface Capability {
  title: string;
  body: string;
  deliverables: readonly string[];
  icon: IconName;
}

export const capabilities: readonly Capability[] = [
  {
    title: 'Event-driven systems',
    body: 'Services that talk to each other in real time instead of in nightly batches. I build Kafka pipelines with a set throughput budget and plan how each one handles failure.',
    deliverables: ['Kafka pipelines', 'Service integration', 'Scheduled jobs', 'Data sync'],
    icon: 'stream',
  },
  {
    title: 'Backend & API platforms',
    body: 'The engine behind a product: a documented API, a data model that holds up under change, and the business logic the operation runs on.',
    deliverables: ['REST APIs', 'Schema design', 'Auth & permissions', 'Observability'],
    icon: 'server',
  },
  {
    title: 'Data & analytics',
    body: 'High-volume ingestion and the reporting layer on top of it, on the same Druid and Redis stack I run at scale every day.',
    deliverables: ['Ingestion', 'Analytics store', 'Dashboards', 'Alerting'],
    icon: 'chart',
  },
  {
    title: 'Full-stack delivery',
    body: 'Internal tools or customer-facing products, built end to end: React on the front, Spring Boot behind it, deployed to a URL that stays up.',
    deliverables: ['React frontends', 'CI/CD', 'Containers', 'Handover docs'],
    icon: 'layers',
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
    body: 'I write down what gets built, and what explicitly does not, in plain language first. Every disagreement costs less here than in a pull request.',
  },
  {
    title: 'Built to be operated',
    body: 'A service is finished when someone else can diagnose it at 3am. That takes structured logs and honest health checks, and I write the failure paths before the happy path.',
  },
  {
    title: 'Reviews that teach',
    body: 'A review comment that explains the reasoning helps more than one that only blocks the merge. That habit is how a team grows its seniors.',
  },
  {
    title: 'Documented handover',
    body: 'I hand over the repository, the deployment, and the reasoning behind both. Nothing important should live only in one person’s head.',
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
      'Run the engineering team’s delivery: code reviews, technical direction, and mentoring.',
      'Design data and messaging flows on Redis, Kafka, and Apache Druid for high-volume, event-driven workloads.',
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
      'Built and maintained backend services with Spring and Spring Boot on Java, Redis, Kafka, Druid, and MySQL.',
      'Developed event-driven workflows that integrated processes across multiple systems.',
      'Partnered with project managers across business units to plan and deliver key projects.',
      'Shipped reliably on an Agile cadence with a disciplined SDLC.',
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
      'Main technology support contact across the head office, covering network, email, operating systems, hardware, and mainframe/midrange operations.',
      'Diagnosed, resolved, and documented issues in Remedy, and added to the internal knowledge base.',
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
    body: 'A Spring Boot 3 backend routes messages over persistent WebSocket connections, and a React frontend provides the chat interface. I built it to try out low-latency, connection-heavy backend design end to end.',
    stack: ['Spring Boot 3', 'WebSocket', 'React', 'Lombok'],
    highlights: [
      'Messages arrive instantly over WebSocket, with no polling.',
      'Users can create and join multiple channels; the server manages connection state.',
      'A deliberately lean architecture that can scale out as channels and users grow.',
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
    items: ['Spring Boot', 'Spring', 'REST APIs', 'WebSocket', 'Event-driven architecture'],
  },
  { label: 'Data & messaging', items: ['Apache Kafka', 'Redis', 'Apache Druid', 'MySQL'] },
  { label: 'Platform & delivery', items: ['Docker', 'Kubernetes', 'CI/CD', 'Git', 'Agile / Scrum'] },
  { label: 'Leadership', items: ['Technical direction', 'Code review', 'Mentoring', 'Delivery planning'] },
  { label: 'Frontend', items: ['React', 'HTML & CSS'] },
];

/** Sticky-nav sections. Order defines both nav order and scroll-spy order. */
export interface NavSection {
  id: string;
  label: string;
}

export const navSections: readonly NavSection[] = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
