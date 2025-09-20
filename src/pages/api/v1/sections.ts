import type { APIRoute } from 'astro'
import axios from 'axios'
import { getProjectUrl, getSourceUrl} from "../../../utils/config.ts";
import {
    dataSource,
    dictionaryCourses,
    type ExtendedProgram,
    type ExtendedSection,
    getPrograms,
    getSections
} from "../../../utils/data.ts";
import {addCourseLinks, getCodeCourseDetailUrl, getProgramDetailUrl} from "../../../utils/links.ts";
import {simplifyCourse} from "../../../utils/course.ts";

export const prerender = true

type SimpleProgram = Omit<ExtendedProgram, "courses"> & {
    detail_url: string
}

const fillCourse = async (aSection: ExtendedSection) => {
    const aDict = await dictionaryCourses
    const filledCourse = aDict[aSection.course.code]

    return {
        ...aSection,
        course: {
            ...aSection.course,
            ...(filledCourse ? addCourseLinks(simplifyCourse(filledCourse)) : {})
        }
    }
}

export const GET: APIRoute = async () => {
    const sections = await getSections()

    const filledSections = await Promise.all(sections.map(fillCourse))


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
