/**
 * Single source of truth for site content.
 * Components render this; nothing else hardcodes copy.
 */

import type { SimpleIcon } from 'simple-icons';
import {
  siApachedruid,
  siApachekafka,
  siDocker,
  siGit,
  siGo,
  siKubernetes,
  siMysql,
  siOpenjdk,
  siPython,
  siReact,
  siRedis,
  siSpringboot,
} from 'simple-icons';

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
    'I have spent six years building event-driven backends in Java and Spring Boot, and today I lead the engineering team at Plasma that ships them.',
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
];

/** Technologies I have used in production, shown as logo tiles. */
export interface Tech {
  name: string;
  category: string;
  icon: SimpleIcon;
}

export const stack: readonly Tech[] = [
  // Java has no official mark in Simple Icons (trademark), so OpenJDK's stands in.
  { name: 'Java', category: 'Language', icon: siOpenjdk },
  { name: 'Spring Boot', category: 'Framework', icon: siSpringboot },
  { name: 'Apache Kafka', category: 'Messaging', icon: siApachekafka },
  { name: 'Redis', category: 'Cache & state', icon: siRedis },
  { name: 'Apache Druid', category: 'Analytics', icon: siApachedruid },
  { name: 'MySQL', category: 'Database', icon: siMysql },
  { name: 'Go', category: 'Language', icon: siGo },
  { name: 'Python', category: 'Language', icon: siPython },
  { name: 'Docker', category: 'Containers', icon: siDocker },
  { name: 'Kubernetes', category: 'Orchestration', icon: siKubernetes },
  { name: 'React', category: 'Frontend', icon: siReact },
  { name: 'Git', category: 'Version control', icon: siGit },
];

/** Skills without a logo, listed under the tiles. */
export const practices: readonly string[] = [
  'REST APIs',
  'Event-driven architecture',
  'WebSocket',
  'SQL',
  'CI/CD',
  'Agile / Scrum',
  'Technical direction',
  'Code review',
  'Mentoring',
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

/** Sticky-nav sections. Order defines both nav order and scroll-spy order. */
export interface NavSection {
  id: string;
  label: string;
}

export const navSections: readonly NavSection[] = [
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];
