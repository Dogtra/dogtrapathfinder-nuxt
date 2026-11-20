// Reports failed production builds to GitHub as a commit status.
// Netlify only posts GitHub statuses for deploy previews, so without this a
// failed master deploy is invisible on GitHub. The status
// "netlify/production" = failure is what triggers the Claude triage routine.
//
// Needs the secret env var GITHUB_STATUS_TOKEN on the Netlify project
// (fine-grained token, this repo only, "Commit statuses: read & write").
// Never fails or slows the build itself: all errors are logged and swallowed.

const CONTEXT_NAME = 'netlify/production'

async function postStatus({ state, description }) {
  const token = process.env.GITHUB_STATUS_TOKEN
  const sha = process.env.COMMIT_REF
  if (process.env.CONTEXT !== 'production') return
  if (!token || !sha) {
    console.log(`[deploy-failure-status] skipped: ${!token ? 'GITHUB_STATUS_TOKEN' : 'COMMIT_REF'} not set`)
    return
  }

  // REPOSITORY_URL looks like https://github.com/Dogtra/dogtrapathfinder-nuxt
  const repo =
    (process.env.REPOSITORY_URL || '').match(/github\.com[/:]([^/]+\/[^/.]+)/)?.[1] ||
    'Dogtra/dogtrapathfinder-nuxt'
  const targetUrl =
    process.env.SITE_NAME && process.env.DEPLOY_ID
      ? `https://app.netlify.com/sites/${process.env.SITE_NAME}/deploys/${process.env.DEPLOY_ID}`
      : undefined

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/statuses/${sha}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'netlify-deploy-failure-status',
      },
      body: JSON.stringify({
        state,
        context: CONTEXT_NAME,
        // GitHub caps the description at 140 characters
        description: description.replace(/\s+/g, ' ').trim().slice(0, 140),
        target_url: targetUrl,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    console.log(`[deploy-failure-status] GitHub status ${state} on ${sha.slice(0, 7)}: HTTP ${res.status}`)
  } catch (err) {
    console.log(`[deploy-failure-status] could not post GitHub status: ${err.message}`)
  }
}

export const onError = async ({ error }) => {
  const message = error?.message || 'Netlify production build failed'
  await postStatus({ state: 'failure', description: `Build failed: ${message}` })
}

export const onSuccess = async () => {
  await postStatus({ state: 'success', description: 'Production build succeeded' })
}
