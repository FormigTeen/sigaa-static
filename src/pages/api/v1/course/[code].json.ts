 import type { APIRoute, GetStaticPaths } from 'astro'
import axios from 'axios'
import {getSourceUrl} from "../../../../utils/config.ts";
import {dataSource, dictionaryCourses, type ExtendedCourse, getCourses, getPrograms} from "../../../../utils/data.ts";
import {addCourseLinks, getCodeCourseDetailUrl, getCoursesUrl, getProgramsUrl} from "../../../../utils/links.ts";
import {simplifyCourse} from "../../../../utils/course.ts";

export const prerender = true

const SOURCE_URL = getSourceUrl()

export const getStaticPaths: GetStaticPaths = async () => {
    const codes = await getCourses().then(
        aPrograms => aPrograms.map(({ id_ref }) => [id_ref, true])
    ).then(
        entries => Object.fromEntries(entries)
    ).then(
        obj => Object.keys(obj)
    )
  return codes.map((code) => ({ params: { code } }))
}
const convertCode = (code: string) => dictionaryCourses.then(
    dict => dict[code] ? addCourseLinks(simplifyCourse(dict[code])) : { code }
)

const convertList = (codes: string[]) => Promise.all(codes.map(convertCode))

const convertNestedList = (codes: string[][]) => Promise.all(codes.map(convertList))

export const GET: APIRoute = async ({ params }) => {
    const code = String(params?.code ?? '')
    const item = await getCourses().then(
        programs => programs.find(aPrograms => aPrograms.id_ref === code),
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
    ]);

    return new Response(JSON.stringify({
        ...item,
        prerequisites,
        corequisites,
        equivalences,
        list_url: getCoursesUrl(),
        code_url: getCodeCourseDetailUrl({ code: item.code }),
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
