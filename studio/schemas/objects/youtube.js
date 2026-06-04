import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'youtube',
  title: 'Vidéo YouTube',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL YouTube',
      type: 'url',
      description: 'Ex. https://www.youtube.com/watch?v=xxxxxxxx',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { url: 'url' },
    prepare({ url }) {
      return { title: 'Vidéo YouTube', subtitle: url }
    },
  },
})
