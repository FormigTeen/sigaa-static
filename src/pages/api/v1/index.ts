import type { APIRoute } from 'astro'
import { getProgramsUrl, getCoursesUrl } from '../../../utils/links.ts'
import { getSectionsUrl } from '../../../utils/links.ts'

export const prerender = true

export const GET: APIRoute = async () => {
  const payload = {
    programs_url: getProgramsUrl(),
    courses_url: getCoursesUrl(),
    sections_url: getSectionsUrl(),
  }

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: jsonHeaders({ cache: true }),
  })
}

function jsonHeaders(opts?: { cache?: boolean }) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  }
  if (opts?.cache) {
    headers['Cache-Control'] = 'public, max-age=300, s-maxage=600'
  }
  return headers
}

