import type { PortfolioData } from '@/types'
import { buildChatSystemPrompt } from '@/data/build-system-prompt'

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
    availability: 'Open to opportunities'
  },

  links: {
    github: 'https://github.com/devinjnugraha',
    linkedin: 'https://linkedin.com/in/devinjnugraha',
    cv: '/cv.pdf',
    email: 'devinjn123@gmail.com'
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
      durationNote: '',
      honor: 'Very Satisfactory (Memuaskan)',
      thesis: {
        title:
          'Optimizing Convolutional Neural Network Using Weighted Loss for Glaucoma Detection',
        description:
          'Proposed weighted loss application in CNN to detect glaucoma on the imbalanced SMDG-19 fundus image dataset, demonstrating improved recall and F1-score over standard cross-entropy loss.',
        publicationRef: 'sciencedirect-2025'
      },
      gpa: { value: '3.87', scale: '4.00' },
      organizations: [
        {
          role: 'Deputy Head of Information Technology Department',
          organization: 'Eksekutif Mahasiswa Informatika (EMIF)',
          startDate: '2022-01',
          endDate: '2023-01',
          description:
            'Co-led technical initiatives and managed IT operations for the Informatics Student Executive Organization, supporting internal digital services and infrastructure.',
          highlights: [
            'Developed and maintained the organization website using Laravel',
            'Provided technical support and administration for IT infrastructure',
            'Collaborated with student leaders to deliver technology solutions for organizational activities',
            'Improved accessibility of organizational information through web-based platforms'
          ]
        }
      ]
    },
    {
      id: '63-mipa',
      institution: 'SMAN 63 Jakarta',
      institutionShort: 'SMAN 63',
      degree: 'High School',
      field: 'Mathematics and Natural Science',
      location: 'Jakarta Selatan, Jakarta, Indonesia',
      startYear: 2017,
      endYear: 2020,
      durationNote: '',
      honor: '',
      gpa: { value: '3.37', scale: '4.00' }
    }
  ],

  experience: [
    {
      id: 'test',
      role: 'Test Role',
      organization: 'Test Organization',
      type: 'full-time',
      startDate: '2020-01',
      endDate: null,
      description: 'This is a test experience entry.',
      highlights: ['Did something great', 'Achieved something amazing'],
      skills: ['Testing', 'Example Skill']
    },
    {
      id: 'sd-cgs',
      role: 'Software Developer',
      organization: 'CGS International Sekuritas Indonesia',
      type: 'full-time',
      startDate: '2024-02',
      endDate: '2026-03',
      description:
        'Developing and maintaining internal web applications for securities trading and portfolio management using React, Next.js, and Spring Boot. Collaborating with cross-functional teams to implement new features, optimize performance, and ensure security compliance in a fast-paced financial environment.',
      highlights: [
        'Built a real-time stock monitoring dashboard using React and WebSocket',
        'Implemented RESTful APIs with Spring Boot to support trading operations',
        'Optimized application performance, reducing load times by 30%',
        'Collaborated with traders and analysts to gather requirements and deliver tailored solutions'
      ],
      skills: [
        'React',
        'Next.js',
        'Spring Boot',
        'REST APIs',
        'WebSocket',
        'Performance Optimization',
        'Agile Development'
      ]
    },
    {
      id: 'ta-filkom',
      role: 'Practicum Assistant',
      organization: 'Brawijaya University',
      type: 'part-time',
      startDate: '2021-08',
      endDate: '2023-01',
      description:
        'Taught and mentored undergraduate students in programming, algorithms, databases, and operating systems through weekly laboratory sessions. Delivered hands-on instruction using Java, SQL Server, and Linux while supporting students in developing strong foundations in computer science concepts.',
      highlights: [
        'Instructed over 150 students across five computer science courses',
        'Taught Java programming fundamentals, object-oriented programming, algorithms, and data structures',
        'Delivered database laboratory sessions covering ERD, relational algebra, SQL, transactions, and T-SQL',
        'Guided operating systems concepts using Linux, covering shell scripting, process management, synchronization, and virtualization',
        'Prepared teaching materials, evaluated assignments, and provided academic mentoring'
      ],
      skills: [
        'Java',
        'SQL Server',
        'Linux',
        'Algorithms and Data Structures',
        'Database Systems',
        'Object-Oriented Programming',
        'Operating Systems',
        'Teaching',
        'Mentoring'
      ]
    }
  ],

  certifications: [
    {
      id: 'aws-developer',
      name: 'Certified AWS Developer',
      issuer: 'Amazon Web Services',
      year: 2025,
      credentialUrl: '',
      skills: ['AWS', 'Cloud Computing', 'Serverless', 'DevOps'],
      featured: true,
      badgeUrl:
        'https://images.credly.com/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png'
    },
    {
      id: 'tf-developer',
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google / TensorFlow',
      year: 2023,
      credentialUrl: '',
      skills: ['TensorFlow', 'Deep Learning', 'CNN', 'NLP'],
      featured: true,
      badgeUrl:
        'https://devinjnugraha.github.io/static/media/logoTensorFlowCertified.c42092cdb501d0753cd8.png'
    },
    {
      id: 'google-data-analytics',
      name: 'Google Data Analytics Certificate',
      issuer: 'Google',
      year: 2022,
      credentialUrl: '',
      skills: ['Data Analysis', 'SQL', 'R', 'Tableau', 'BigQuery'],
      featured: true,
      badgeUrl:
        'https://images.credly.com/size/680x680/images/d41de2b7-cbc2-47ec-bcf1-ebecbe83872f/GCC_badge_DA_1000x1000.png'
    },
    {
      id: 'google-it-python',
      name: 'Google IT Automation with Python',
      issuer: 'Google',
      year: 2022,
      credentialUrl: '',
      skills: ['Python', 'Automation', 'Git', 'Regex', 'Cloud'],
      featured: false,
      badgeUrl:
        'https://images.credly.com/size/160x160/images/efbdc0d6-b46e-4e3c-8cf8-2314d8a5b971/GCC_badge_python_1000x1000.png'
    }
  ],

  achievements: [
    {
      id: 'isfest-2023',
      title: '7th Place — ISFEST UMN 2023 Data Competition',
      description:
        'Placed 7th in a national data science competition focused on predicting house prices in the Greater Jakarta area (Jabodetabek).',
      year: 2023,
      type: 'competition'
    },
    {
      id: 'fast-grad',
      title: 'Graduated in 3.5 Years with Very Satisfactory Standing',
      description:
        'Completed a 4-year Computer Science program at Brawijaya University in 3.5 years.',
      year: 2023,
      type: 'academic'
    }
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
      myRole: '',
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
        'Grad-CAM'
      ],
      featured: true
    }
  ],

  writings: [
    {
      id: 'linkedin-1',
      title: 'UntukSatuBumi: A Call for Indonesia Environmental Action',
      description:
        'An article discussing the importance of mangrove conservation.',
      url: 'https://www.linkedin.com/posts/devinjnugraha_untuksatubumi-activity-7392427953571151872-iyIU?utm_source=share&utm_medium=member_desktop&rcm=ACoAADNPd1sB-NFLC8YAqs_gCNYKfyH3R93XQOE',
      type: 'article',
      publishedDate: '2024-10-15'
    },
    {
      id: 'linkedin-2',
      title: `HariBatikNasional: Celebrating Indonesia's Cultural Heritage`,
      description:
        'An article highlighting the significance of traditional batik in Indonesian culture.',
      url: 'https://www.linkedin.com/posts/devinjnugraha_haribatiknasional-batikday-activity-7247131428742701056-y2qv?utm_source=share&utm_medium=member_desktop&rcm=ACoAADNPd1sB-NFLC8YAqs_gCNYKfyH3R93XQOE',
      type: 'article',
      publishedDate: '2024-10-02'
    },
    {
      id: 'linkedin-3',
      title:
        'Embracing Effective Communication: Insights from an Exciting Capstone Project',
      description:
        'A reflection on the importance of effective communication skills, inspired by a Bangkit capstone project experience.',
      url: 'https://www.linkedin.com/posts/devinjnugraha_effectivecommunication-capstoneproject-collaborationskills-activity-7072999803621683200-axwK?utm_source=share&utm_medium=member_desktop&rcm=ACoAADNPd1sB-NFLC8YAqs_gCNYKfyH3R93XQOE',
      type: 'video',
      publishedDate: '2024-06-04'
    }
  ],
  projects: [
    {
      title: 'Personal Portfolio',
      image: '/portfolio.png',
      url: 'https://github.com/devinjnugraha'
    },
    {
      title: 'Glaucoma Detection CNN',
      image: '/glaucoma.png',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0010482525012260'
    },
    {
      title: 'Stock Monitoring Dashboard',
      image: '/stockbro.png',
      url: '#'
    }
  ],

  skills: {
    languages: ['Python', 'TypeScript', 'JavaScript', 'Java'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
    backend: ['Spring Boot', 'Node.js', 'REST APIs'],
    mlAi: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'CNN', 'NLP', 'Grad-CAM'],
    data: ['Pandas', 'NumPy', 'Matplotlib', 'SQL'],
    tools: ['Git', 'Docker', 'Vercel', 'Google Cloud', 'Jupyter']
  },

  chat: {
    systemPrompt: '' // populated below after portfolio is fully defined
  }
}

// Populate the system prompt from the actual portfolio data (avoids circular reference)
portfolio.chat.systemPrompt = buildChatSystemPrompt(portfolio)
