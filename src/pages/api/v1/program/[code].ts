import type { APIRoute, GetStaticPaths } from 'astro'
import axios from 'axios'
import {getSourceUrl} from "../../../../utils/config.ts";
import {dataSource, getPrograms} from "../../../../utils/data.ts";
import { getProgramsUrl} from "../../../../utils/links.ts";
import {addCourseLinks} from "../../../../utils/links.ts";

export const prerender = true

const SOURCE_URL = getSourceUrl()

export const getStaticPaths: GetStaticPaths = async () => {
    const codes = await getPrograms().then(
        aPrograms => aPrograms.map(({ id_ref }) => [id_ref, true])
    ).then(
        entries => Object.fromEntries(entries)
    ).then(
        obj => Object.keys(obj)
    )
  return codes.map((code) => ({ params: { code } }))
}

export const GET: APIRoute = async ({ params }) => {
    const code = String(params?.code ?? '')
    const item = await getPrograms().then(
        programs => programs.find(aPrograms => aPrograms.id_ref === code),
    )

    if (!item) {
        return new Response(
            JSON.stringify({ error: 'Not found', code }),
            { status: 404, headers: jsonHeaders({ cache: true }) },
        )
    }

    return new Response(JSON.stringify({
        ...item,
        courses: item.courses.map(addCourseLinks),
        list_url: getProgramsUrl()
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