import type { PortfolioData } from '@/types'

export function generateSchema(data: PortfolioData, siteUrl: string) {
  const { person, links, education, certifications, publications, skills } = data

  const allSkills = [
    ...skills.languages,
    ...skills.frontend,
    ...skills.backend,
    ...skills.mlAi,
    ...skills.data,
    ...skills.tools,
  ]

  const alumniOf = education.map(e => ({
    '@type': 'EducationalOrganization',
    name: e.institution,
    department: `${e.degree} in ${e.field}`,
  }))

  const hasCredential = certifications.map(c => ({
    '@type': 'EducationalOccupationalCredential',
    name: c.name,
    issuer: { '@type': 'Organization', name: c.issuer },
    dateCredentialIssued: String(c.year),
  }))

  const scholarlyArticles = publications.map(pub => ({
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    author: pub.authors.map(a => ({ '@type': 'Person', name: a })),
    datePublished: pub.publishedDate,
    isPartOf: {
      '@type': 'Periodical',
      name: pub.journal,
      publisher: { '@type': 'Organization', name: pub.publisher },
    },
    url: pub.url,
    identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi },
    description: pub.abstract,
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: person.name,
        url: siteUrl,
        jobTitle: person.tagline,
        email: `mailto:${links.email}`,
        sameAs: [links.github, links.linkedin],
        description: person.bio,
        alumniOf,
        hasCredential,
        knowsAbout: allSkills,
      },
      ...scholarlyArticles,
    ],
  }
}
