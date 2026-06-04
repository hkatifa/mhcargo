import { defineCliConfig } from 'sanity/cli'

// projectId + dataset locked per docs/cms.md (reuse existing project).
// studioHost makes `sanity deploy` non-interactive (deploys to
// https://mh-cargo.sanity.studio). If the host is taken under another project,
// deploy will fail loudly — that is fine, it never touches the live site.
export default defineCliConfig({
  api: {
    projectId: 'qmzq54py',
    dataset: 'production',
  },
  studioHost: 'mh-cargo',
})
