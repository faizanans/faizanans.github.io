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
  summary:
    'I build event-driven backend systems in Java and Spring Boot — services that move data through Kafka, Redis, Druid, and MySQL — and I lead the team that ships them.',
} as const;

/** Rotating headline in the hero terminal. */
export const headlines: readonly string[] = [
  'event-driven backend systems',
  'Kafka pipelines that stay up',
  'Druid-backed analytics at volume',
  'engineering teams that ship',
];

/** Stat strip under the hero. */
export interface Stat {
  value: string;
  label: string;
}

export const stats: readonly Stat[] = [
  { value: '9+', label: 'Years in tech' },
  { value: '6', label: 'Years backend engineering' },
  { value: '4', label: 'Engineers led' },
  { value: 'B.S.', label: 'Software Engineering, UTD' },
];

/** "What I do" cards. `index` renders as a monospace ordinal. */
export interface Focus {
  title: string;
  body: string;
  tags: readonly string[];
}

export const focus: readonly Focus[] = [
  {
    title: 'Backend services',
    body: 'Production APIs and services in Java and Spring Boot, backed by MySQL and Redis — designed to be operated, not just launched.',
    tags: ['Java', 'Spring Boot', 'REST', 'MySQL'],
  },
  {
    title: 'Event-driven systems',
    body: 'Workflows that integrate systems in real time: Kafka pipelines and Druid-backed analytics built for throughput and clean failure handling.',
    tags: ['Kafka', 'Apache Druid', 'Redis'],
  },
  {
    title: 'Technical leadership',
    body: 'Code reviews, mentoring, and engineering standards — plus planning delivery directly with project managers across business units.',
    tags: ['Code review', 'Mentoring', 'Agile SDLC'],
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
      "Manage the engineering team's delivery — code reviews, technical direction, and mentoring.",
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
  {
    label: 'Data & messaging',
    items: ['Kafka', 'Redis', 'Apache Druid', 'MySQL'],
  },
  { label: 'Platform', items: ['Docker', 'Kubernetes', 'CI/CD', 'Git'] },
];

/** Sticky-nav sections. Order defines both nav order and scroll-spy order. */
export interface NavSection {
  id: string;
  label: string;
}

export const navSections: readonly NavSection[] = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
