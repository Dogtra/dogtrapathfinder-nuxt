import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

export function sanitizeHtml(html?: string | null): string {
  return html ? DOMPurify.sanitize(html) : ''
}

/** Markdown → sanitized HTML. */
export function renderMarkdown(markdown?: string | null): string {
  return markdown ? sanitizeHtml(marked.parse(markdown, { async: false })) : ''
}

const youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi

/** YouTube video id from any YouTube URL (same logic as vue-youtube-embed's getIdFromURL). */
export function getYoutubeId(url?: string | null): string {
  if (!url) return ''
  let id = url.replace(youtubeRegexp, '$1')
  if (id.includes(';')) {
    const pieces = id.split(';')
    id = pieces[1]?.includes('%')
      ? `http://youtube.com${decodeURIComponent(pieces[1])}`.replace(youtubeRegexp, '$1')
      : pieces[0]!
  }
  else if (id.includes('#')) {
    id = id.split('#')[0]!
  }
  return id
}
