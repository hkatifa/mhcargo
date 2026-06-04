import { defineType, defineField } from 'sanity'

// CTA box — author picks a background (navy or orange) and text alignment.
// The button colour is DERIVED at render time (the opposite brand colour) and is
// intentionally NOT a field, so authors can't create off-brand combinations.
// Button text is always white.
export default defineType({
  name: 'ctaBox',
  title: 'Encadré CTA',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titre', type: 'string' }),
    defineField({ name: 'text', title: 'Texte', type: 'text', rows: 2 }),
    defineField({ name: 'buttonLabel', title: 'Libellé du bouton', type: 'string' }),
    defineField({
      name: 'buttonUrl',
      title: 'Lien du bouton',
      type: 'url',
      description: 'Ex. https://mhcargo.ma/contact ou /contact',
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
    }),
    defineField({
      name: 'background',
      title: 'Couleur de fond',
      type: 'string',
      initialValue: 'navy',
      options: {
        layout: 'radio',
        list: [
          { title: 'Bleu marine', value: 'navy' },
          { title: 'Orange', value: 'orange' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textAlign',
      title: 'Alignement du texte',
      type: 'string',
      initialValue: 'left',
      options: {
        layout: 'radio',
        list: [
          { title: 'Gauche', value: 'left' },
          { title: 'Centré', value: 'center' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'heading', buttonLabel: 'buttonLabel', background: 'background' },
    prepare({ title, buttonLabel, background }) {
      return {
        title: `CTA : ${title || 'Sans titre'}`,
        subtitle: `${background === 'orange' ? 'Orange' : 'Bleu marine'}${buttonLabel ? ' · ' + buttonLabel : ''}`,
      }
    },
  },
})
