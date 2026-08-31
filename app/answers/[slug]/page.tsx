import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/site/PageShell'
import JsonLd from '@/components/site/JsonLd'
import { ANSWERS, getAnswer, type Block } from '../answers'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og'

// ---------------------------------------------------------------------------
// One route for all six answer pages. The content lives in ../answers.ts and
// nothing page-specific lives here, so a new question is a new entry in that
// array rather than a new file.
//
// No layout.tsx sits above this. app/services/layout.tsx sets a canonical that
// every child has to remember to override; doing the same here would put a
// second inherited canonical in the tree for no gain, so each page sets its
// own in generateMetadata.
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return ANSWERS.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const answer = getAnswer(params.slug)
  if (!answer) return {}
  return {
    title: answer.metaTitle,
    description: answer.metaDescription,
    alternates: { canonical: `/answers/${answer.slug}` },
    openGraph: {
      title: answer.metaTitle,
      description: answer.metaDescription,
      type: 'article',
      images: OG_IMAGES,
    },
    twitter: {
      card: 'summary_large_image',
      title: answer.metaTitle,
      description: answer.metaDescription,
      images: TWITTER_IMAGES,
    },
  }
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return (
            <p key={i} style={{ fontSize: '1.02rem', color: '#5d6478', lineHeight: 1.75, margin: '0 0 1.25rem' }}>
              {block.text}
            </p>
          )
        }

        if (block.type === 'list') {
          return (
            <ul key={i} style={{ margin: '0 0 1.5rem', paddingLeft: '1.1rem', listStyle: 'none' }}>
              {block.items.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: '1.02rem',
                    color: '#5d6478',
                    lineHeight: 1.7,
                    margin: '0 0 0.7rem',
                    paddingLeft: '1rem',
                    borderLeft: '2px solid #ddd6e6',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )
        }

        // A plain figures table. The numbers are the most quotable thing on the
        // cost page, so they are set as text in a real table rather than baked
        // into an image or a styled div soup.
        return (
          <div key={i} style={{ overflowX: 'auto', margin: '0 0 1.75rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.label} style={{ borderBottom: '1px solid #e4e0ee' }}>
                    <th
                      scope="row"
                      style={{ textAlign: 'left', fontWeight: 600, color: '#2e333a', padding: '0.9rem 1rem 0.9rem 0', verticalAlign: 'top' }}
                    >
                      {row.label}
                      {row.note && (
                        <span style={{ display: 'block', fontWeight: 400, fontSize: '0.85rem', color: '#7b8298', marginTop: '0.2rem' }}>
                          {row.note}
                        </span>
                      )}
                    </th>
                    <td
                      style={{
                        textAlign: 'right',
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                        fontSize: '1.35rem',
                        color: '#7d3d4f',
                        padding: '0.9rem 0',
                        whiteSpace: 'nowrap',
                        verticalAlign: 'top',
                      }}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}

export default function AnswerPage({ params }: { params: { slug: string } }) {
  const answer = getAnswer(params.slug)
  if (!answer) notFound()

  const related = answer.related.map(getAnswer).filter(Boolean)

  return (
    <PageShell
      eyebrow="ANSWERS"
      title={answer.question}
      sub={answer.metaDescription}
    >
      <div style={{ background: '#f4f2fa', padding: '4rem 2rem 5rem' }}>
        <article style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* The answer, set as the loudest thing on the page.
              This paragraph is what an assistant lifts when somebody asks the
              question, so it is written to stand alone and typeset to say "this
              is the part that matters" — not as a decorative pull quote sitting
              beside the real text. */}
          <p
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.06rem, 2.2vw, 1.45rem)',
              lineHeight: 1.55,
              color: '#2e333a',
              borderLeft: '3px solid #7d3d4f',
              paddingLeft: '1.5rem',
              margin: '0 0 3.5rem',
            }}
          >
            {answer.lead}
          </p>

          {answer.sections.map((section) => (
            <section key={section.heading} style={{ margin: '0 0 3rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  margin: '0 0 1.1rem',
                }}
              >
                {section.heading}
              </h2>
              <Blocks blocks={section.blocks} />
            </section>
          ))}

          {answer.faq.length > 0 && (
            <section style={{ margin: '0 0 3rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  margin: '0 0 1.5rem',
                }}
              >
                Related questions
              </h2>
              {answer.faq.map((item) => (
                <div key={item.q} style={{ margin: '0 0 1.75rem' }}>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 600, color: '#2e333a', margin: '0 0 0.5rem' }}>
                    {item.q}
                  </h3>
                  <p style={{ fontSize: '1rem', color: '#5d6478', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </section>
          )}

          {related.length > 0 && (
            <nav
              aria-label="More answers"
              style={{ borderTop: '1px solid #ddd6e6', paddingTop: '2rem' }}
            >
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7d3d4f',
                  margin: '0 0 1rem',
                }}
              >
                More answers
              </p>
              {related.map((r) => (
                <a
                  key={r!.slug}
                  href={`/answers/${r!.slug}`}
                  style={{
                    display: 'block',
                    fontSize: '1.05rem',
                    color: '#2e333a',
                    textDecoration: 'none',
                    padding: '0.7rem 0',
                    borderBottom: '1px solid #e8e4f0',
                  }}
                >
                  {r!.question} <span style={{ color: '#7d3d4f' }}>→</span>
                </a>
              ))}
            </nav>
          )}
        </article>
      </div>

      <JsonLd
        data={articleSchema({
          headline: answer.question,
          description: answer.metaDescription,
          path: `/answers/${answer.slug}`,
          datePublished: answer.datePublished,
        })}
      />
      {/* The lead is the answer to the page's own question, so it goes in as
          the first Q&A. Everything marked up here is text that appears on the
          page — never mark up an answer the reader cannot see. */}
      <JsonLd
        data={faqSchema([{ q: answer.question, a: answer.lead }, ...answer.faq])}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Answers', path: '/answers' },
          { name: answer.shortTitle, path: `/answers/${answer.slug}` },
        ])}
      />
    </PageShell>
  )
}
