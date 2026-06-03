import type {
  PortfolioData,
} from '@/types'

export const portfolio: PortfolioData = {
  person: {
    name: 'Devin Jaya Nugraha',
    initials: 'DJN',
    tagline: 'Software Developer · Certified TensorFlow Developer',
    bio: `I'm a software developer with a passion for intelligent computing and data-driven systems.
My background spans ML research — including a published paper on CNN optimization for medical imaging —
and full-stack web development. I graduated from Brawijaya University in 3.5 years and have since
been working at the intersection of software engineering and applied machine learning.`,
    location: 'Indonesia',
    availability: 'Open to opportunities',
  },

  links: {
    github: 'https://github.com/devinjnugraha',
    linkedin: 'https://linkedin.com/in/devinjnugraha',
    cv: '/cv.pdf',
    email: '',
  },

  education: [
    {
      id: 'ub-cs',
      institution: 'Brawijaya University',
      institutionShort: 'UB',
      degree: 'Bachelor of Computer Science',
      field: 'Informatics Engineering',
      location: 'Malang, East Java, Indonesia',
      startYear: 2020,
      endYear: 2023,
      durationNote: 'Completed in 3.5 years',
      honor: 'Very Satisfactory (Memuaskan)',
      thesis: {
        title: 'Optimizing Convolutional Neural Network Using Weighted Loss for Glaucoma Detection',
        description:
          'Proposed weighted loss application in CNN to detect glaucoma on the imbalanced SMDG-19 fundus image dataset, demonstrating improved recall and F1-score over standard cross-entropy loss.',
        publicationRef: 'sciencedirect-2025',
      },
    },
  ],

  experience: [
    {
      id: 'ta-java',
      role: 'Practicum Assistant — Basic Programming',
      organization: 'Brawijaya University',
      type: 'part-time',
      startDate: '2021-03',
      endDate: '2022-06',
      description:
        'Taught introductory Java programming to 37 students majoring in Informatics, covering standard I/O, data types, conditional statements, loops, arrays, and methods.',
      highlights: [
        'Led weekly lab sessions for 37 undergraduate students',
        'Topics: Java I/O, data types, conditionals, loops, arrays, methods',
        'Prepared lab materials and graded weekly assignments',
      ],
      skills: ['Java', 'Teaching', 'Curriculum Design'],
    },
    {
      id: 'emi-it-deputy',
      role: 'Deputy Head of Information Technology',
      organization: 'Eksekutif Mahasiswa Informatika (EMI)',
      type: 'organizational',
      startDate: '2022-03',
      endDate: '2023-03',
      description:
        'Led the IT department within the student executive body of the Informatics faculty, overseeing digital infrastructure and technology initiatives.',
      highlights: [
        'Managed IT department operations and member coordination',
        'Oversaw digital communications and internal systems',
        'Organized technology-related student events',
      ],
      skills: ['Leadership', 'Project Management', 'Team Coordination'],
    },
  ],

  certifications: [
    {
      id: 'tf-developer',
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google / TensorFlow',
      year: 2023,
      credentialUrl: '',
      skills: ['TensorFlow', 'Deep Learning', 'CNN', 'NLP'],
      featured: true,
    },
    {
      id: 'google-data-analytics',
      name: 'Google Data Analytics Certificate',
      issuer: 'Google',
      year: 2022,
      credentialUrl: '',
      skills: ['Data Analysis', 'SQL', 'R', 'Tableau', 'BigQuery'],
      featured: true,
    },
    {
      id: 'google-it-python',
      name: 'Google IT Automation with Python',
      issuer: 'Google',
      year: 2022,
      credentialUrl: '',
      skills: ['Python', 'Automation', 'Git', 'Regex', 'Cloud'],
      featured: true,
    },
  ],

  achievements: [
    {
      id: 'isfest-2023',
      title: '7th Place — ISFEST UMN 2023 Data Competition',
      description:
        'Placed 7th in a national data science competition focused on predicting house prices in the Greater Jakarta area (Jabodetabek).',
      year: 2023,
      type: 'competition',
    },
    {
      id: 'fast-grad',
      title: 'Graduated in 3.5 Years with Very Satisfactory Standing',
      description:
        'Completed a 4-year Computer Science program at Brawijaya University in 3.5 years.',
      year: 2023,
      type: 'academic',
    },
  ],

  publications: [
    {
      id: 'sciencedirect-2025',
      title:
        'Weighted loss for imbalanced glaucoma detection: Insights from visual explanations',
      journal: 'Computers in Biology and Medicine',
      journalShort: 'Comput. Biol. Med.',
      quartile: 'Q1',
      publisher: 'Elsevier / ScienceDirect',
      publishedDate: '2025-08-17',
      authors: ['Devin Jaya Nugraha', 'Novanto Yudistira', 'Agus Wahyu Widodo'],
      myRole: 'Visualization, Software, Investigation, Data Curation',
      doi: '10.1016/j.compbiomed.2025.012260',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0010482525012260',
      abstract:
        'This study evaluated four deep learning architectures on nine glaucoma-related datasets to assess the effectiveness of weighted loss functions in improving detection of underrepresented classes. Weighted loss improved recall and F1-score compared to standard cross-entropy and focal loss.',
      keywords: [
        'Glaucoma detection',
        'Weighted loss',
        'CNN',
        'Class imbalance',
        'Explainable AI',
        'Grad-CAM',
      ],
      featured: true,
    },
  ],

  writings: [
    {
      id: 'linkedin-profile',
      title: 'LinkedIn Profile & Posts',
      description: 'Professional updates, project write-ups, and reflections.',
      url: 'https://linkedin.com/in/devinjnugraha',
      type: 'linkedin',
    },
  ],

  skills: {
    languages: ['Python', 'TypeScript', 'JavaScript', 'Java'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
    backend: ['Spring Boot', 'Node.js', 'REST APIs'],
    mlAi: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'CNN', 'NLP', 'Grad-CAM'],
    data: ['Pandas', 'NumPy', 'Matplotlib', 'SQL'],
    tools: ['Git', 'Docker', 'Vercel', 'Google Cloud', 'Jupyter'],
  },

  chat: {
    systemPrompt: `You are an AI representative of Devin Jaya Nugraha, a software developer and ML researcher from Indonesia.

ABOUT DEVIN:
- Software Developer with expertise in web development (React, Next.js, Spring Boot) and machine learning (TensorFlow, PyTorch)
- Holds a Bachelor of Computer Science from Brawijaya University (Malang, Indonesia), graduated in 3.5 years with Very Satisfactory standing
- Certified TensorFlow Developer, Google Data Analytics Certificate, Google IT Automation with Python

RESEARCH:
- Published first-author paper: "Weighted loss for imbalanced glaucoma detection: Insights from visual explanations" in Computers in Biology and Medicine (Q1 journal, Elsevier/ScienceDirect, August 2025)
- Research focus: applying weighted loss to CNNs on the SMDG-19 dataset to address class imbalance in medical imaging
- Key finding: weighted loss improves recall and F1-score for minority class (glaucoma-positive) detection vs. standard cross-entropy

EXPERIENCE:
- Practicum Assistant at Brawijaya University — taught Java programming to 37 students
- Deputy Head of IT at Eksekutif Mahasiswa Informatika (2022–2023)
- 7th place in ISFEST UMN 2023 data competition (house price prediction, Jabodetabek)

PERSONALITY & COMMUNICATION STYLE:
- Speak in first person as Devin ("I worked on...", "My research focused on...")
- Be concise, honest, and technically precise
- Show genuine enthusiasm for ML/AI and software engineering
- If asked something you don't know the specific answer to, say "I'm not sure about that specific detail" — do not fabricate

CONSTRAINTS:
- Do not invent job titles, companies, or dates not listed above
- Do not claim expertise in areas not mentioned
- Keep responses to 2–4 sentences unless the question requires more detail
- If asked about personal/sensitive matters, politely redirect to professional topics`,
  },
}
