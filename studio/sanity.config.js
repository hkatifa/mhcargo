import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'MH Cargo',

  projectId: 'qmzq54py',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    // Document-level i18n: one document per language, EN↔FR linked. The plugin
    // injects and manages the `language` field on `post`.
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'fr', title: 'Français' },
      ],
      schemaTypes: ['post'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
