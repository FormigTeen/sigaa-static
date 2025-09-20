 import type { APIRoute } from 'astro'
import axios from 'axios'
import { getProjectUrl, getSourceUrl} from "../../../utils/config.ts";
import {dataSource, type ExtendedCourse, getCourses} from "../../../utils/data.ts";
import {getCodeCourseDetailUrl, getCourseDetailUrl, getCodeCourseSectionsUrl} from "../../../utils/links.ts";
 import {getSectionCount} from "../../../utils/course.ts";

export const prerender = true

const SOURCE_URL = getSourceUrl()


type SimpleCourse = Omit<ExtendedCourse, "equivalences" | "corequisites" | "prerequisites"> & {
    detail_url: string
    code_url: string
    sections_url: string
    sections_count: number
}

export const GET: APIRoute = async () => {
    const courses = await getCourses()
        .then(
            courses => courses.map(
                async ({ equivalences, prerequisites, corequisites, ...rest }): Promise<SimpleCourse> => ({
                    ...rest,
                    detail_url: getCourseDetailUrl({ id_ref: rest.id_ref }),
                    code_url: getCodeCourseDetailUrl({ code: rest.code }),
                    sections_url: getCodeCourseSectionsUrl({ code: rest.code }),
                    sections_count: await getSectionCount({ code: rest.code}),
                })
            )
        ).then(coursePromises => Promise.all(coursePromises))


    return new Response(
        JSON.stringify(courses), {
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
