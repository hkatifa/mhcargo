import { defineType, defineField, defineArrayMember } from 'sanity'

// Blog post. Field NAMES are English (stable for GROQ/code); author-facing
// titles/labels are French. `language` is injected and managed by the
// @sanity/document-internationalization plugin — do not declare it here.
export default defineType({
  name: 'post',
  title: 'Article de blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Managed by @sanity/document-internationalization (v6 requires the field to
    // exist in-schema; the plugin writes it). Hidden/read-only from authors.
    defineField({
      name: 'language',
      title: 'Langue',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      description: 'Image d’en-tête de l’article et vignette dans la liste.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: 'Description de l’image pour l’accessibilité et le SEO.',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      description: 'Résumé court — sert aussi de méta-description SEO.',
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        // Rich text
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H2', value: 'h2' },
            { title: 'Titre H3', value: 'h3' },
            { title: 'Titre H4', value: 'h4' },
            { title: 'Titre H5', value: 'h5' },
            { title: 'Citation', value: 'blockquote' },
          ],
          lists: [
            { title: 'Puces', value: 'bullet' },
            { title: 'Numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Souligné', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                ],
              },
            ],
          },
        }),
        // Inline image with alt + optional caption
        defineArrayMember({
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
            defineField({ name: 'caption', title: 'Légende', type: 'string' }),
          ],
        }),
        // CTA box and YouTube embed
        defineArrayMember({ type: 'ctaBox' }),
        defineArrayMember({ type: 'youtube' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', date: 'publishedAt', language: 'language' },
    prepare({ title, media, date, language }) {
      const lang = language ? language.toUpperCase() : '—'
      const subtitle = date ? new Date(date).toLocaleDateString('fr-FR') : 'Pas de date'
      return { title: `[${lang}] ${title || 'Sans titre'}`, media, subtitle }
    },
  },
})
