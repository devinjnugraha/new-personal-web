// ─── Person ──────────────────────────────────────────────────────────────────

export interface Person {
  name: string
  initials: string
  tagline: string
  bio: string
  location: string
  availability: string
}

export interface Links {
  github: string
  linkedin: string
  cv: string
  email: string
}

// ─── Education ───────────────────────────────────────────────────────────────

export interface Thesis {
  title: string
  description: string
  publicationRef: string
}

export interface Gpa {
  value: string
  scale: string
}

export interface EducationOrganization {
  role: string
  organization: string
  startDate: string
  endDate: string
  description: string
  highlights: string[]
}

export interface Education {
  id: string
  institution: string
  institutionShort: string
  degree: string
  field: string
  location: string
  startYear: number
  endYear: number
  durationNote: string
  honor: string
  thesis?: Thesis
  gpa?: Gpa
  organizations?: EducationOrganization[]
}

// ─── Experience ──────────────────────────────────────────────────────────────

export type ExperienceType =
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'organizational'
  | 'internship'

export interface Experience {
  id: string
  role: string
  organization: string
  type: ExperienceType
  startDate: string // ISO month: 'YYYY-MM'
  endDate: string | null // null = present
  description: string
  highlights: string[]
  skills: string[]
}

// ─── Certifications ──────────────────────────────────────────────────────────

export interface Certification {
  id: string
  name: string
  issuer: string
  year: number
  credentialUrl: string
  skills: string[]
  featured: boolean
  badgeUrl?: string
}

// ─── Achievements ────────────────────────────────────────────────────────────

export type AchievementType =
  | 'competition'
  | 'academic'
  | 'award'
  | 'recognition'

export interface Achievement {
  id: string
  title: string
  description: string
  year: number
  type: AchievementType
}

// ─── Publications ─────────────────────────────────────────────────────────────

export type JournalQuartile = 'Q1' | 'Q2' | 'Q3' | 'Q4'

export interface Publication {
  id: string
  title: string
  journal: string
  journalShort: string
  quartile: JournalQuartile
  publisher: string
  publishedDate: string // ISO date: 'YYYY-MM-DD'
  authors: string[]
  myRole: string
  doi: string
  url: string
  abstract: string
  keywords: string[]
  featured: boolean
}

// ─── Writings ────────────────────────────────────────────────────────────────

export type WritingType = 'blog' | 'linkedin' | 'article' | 'note' | 'video'

export interface Writing {
  id: string
  title: string
  description: string
  url: string
  type: WritingType
  publishedDate?: string
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface Skills {
  languages: string[]
  frontend: string[]
  backend: string[]
  mlAi: string[]
  data: string[]
  tools: string[]
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatConfig {
  systemPrompt: string
}

// ─── Portfolio Root ───────────────────────────────────────────────────────────

export interface PortfolioData {
  person: Person
  links: Links
  education: Education[]
  experience: Experience[]
  certifications: Certification[]
  achievements: Achievement[]
  publications: Publication[]
  writings: Writing[]
  skills: Skills
  chat: ChatConfig
}

// ─── Chat Message (Vercel AI SDK) ─────────────────────────────────────────────

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}
