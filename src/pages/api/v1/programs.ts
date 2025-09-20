import type { APIRoute } from 'astro'
import axios from 'axios'
import { getProjectUrl, getSourceUrl} from "../../../utils/config.ts";
import {dataSource, type ExtendedProgram, getPrograms} from "../../../utils/data.ts";
import {getProgramDetailUrl} from "../../../utils/links.ts";

export const prerender = true

const SOURCE_URL = getSourceUrl()



type SimpleProgram = Omit<ExtendedProgram, "courses"> & {
    detail_url: string
}

export const GET: APIRoute = async () => {
    const extendedCourses = await getPrograms()
        .then(courses => courses as ExtendedProgram[])

    const simpleCourses: SimpleProgram[] = extendedCourses.map(({ courses, ...rest }) => ({
            ...rest,
            detail_url: getProgramDetailUrl(rest),
        })
    )


    return new Response(
        JSON.stringify(simpleCourses), {
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
