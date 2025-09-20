import type { APIRoute, GetStaticPaths } from 'astro'
import axios from 'axios'
import { getSourceUrl } from '../../../../../utils/config.ts'
import { dataSource, dictionaryCourses, type ExtendedCourse, getCourses, getPrograms } from '../../../../../utils/data.ts'
import {
    addCourseLinks,
    getCodeCourseDetailUrl,
    getCourseDetailUrl,
    getCoursesUrl,
    getProgramsUrl
} from '../../../../../utils/links.ts'

export const prerender = true

const SOURCE_URL = getSourceUrl()

export const getStaticPaths: GetStaticPaths = async () => {
  const codes = await getCourses()
    .then(courses => courses.map(({ code }) => [code, true]))
    .then(entries => Object.fromEntries(entries))
    .then(obj => Object.keys(obj))

  return codes.map((code) => ({ params: { code } }))
}

const simplifyCourse = (course: ExtendedCourse) => ({
  code: course.code,
  id_ref: course.id_ref,
  name: course.name,
})

const convertCode = (code: string) => dictionaryCourses.then(
  dict => dict[code] ? addCourseLinks(simplifyCourse(dict[code])) : { code }
)

const convertList = (codes: string[]) => Promise.all(codes.map(convertCode))

const convertNestedList = (codes: string[][]) => Promise.all(codes.map(convertList))

export const GET: APIRoute = async ({ params }) => {
  const code = String(params?.code ?? '')

  const item = await getCourses().then(
    courses => courses.find(course => course.code === code),
  )

  if (!item) {
    return new Response(
      JSON.stringify({ error: 'Not found', code }),
      { status: 404, headers: jsonHeaders({ cache: true }) },
    )
  }

  const [prerequisites, corequisites, equivalences] = await Promise.all([
    convertNestedList(item.prerequisites),
    convertNestedList(item.corequisites),
    convertNestedList(item.equivalences),
  ])

  return new Response(JSON.stringify({
    ...item,
    prerequisites,
    corequisites,
    equivalences,
    list_url: getCoursesUrl(),
    detail_url: getCourseDetailUrl({ id_ref: item.id_ref }),
  }), {
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
