 import type { APIRoute, GetStaticPaths } from 'astro'
import { dictionaryCourses, type ExtendedSection, getCourses, getSections } from '../../../../../utils/data.ts'
import { addCourseLinks } from '../../../../../utils/links.ts'
import { simplifyCourse } from '../../../../../utils/course.ts'

export const prerender = true

const fillCourse = async (aSection: ExtendedSection) => {
  const aDict = await dictionaryCourses
  const filledCourse = aDict[aSection.course.code]

  return {
    ...aSection,
    course: {
      ...aSection.course,
      ...(filledCourse ? addCourseLinks(simplifyCourse(filledCourse)) : {}),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const codes = await getCourses()
    .then(courses => courses.map(({ code }) => [code, true]))
    .then(entries => Object.fromEntries(entries))
    .then(obj => Object.keys(obj))

  return codes.map((code) => ({ params: { code } }))
}

export const GET: APIRoute = async ({ params }) => {
  const code = String(params?.code ?? '')

  const sections = await getSections()
  const filtered = sections.filter(aSection => aSection.course.code === code)

  const filledSections = await Promise.all(filtered.map(fillCourse))

  return new Response(
    JSON.stringify(filledSections), {
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
