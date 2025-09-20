import {type ExtendedCourse, getSections} from "./data.ts";

export const simplifyCourse = (course: ExtendedCourse) => ({
    code: course.code,
    id_ref: course.id_ref,
    name: course.name,
})

export const getSectionCount = async (course: Pick<ExtendedCourse, 'code'>) => {
    const sections = await getSections()
    return sections.filter(section => section.course.code === course.code).length
}