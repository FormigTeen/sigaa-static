import type {ExtendedCourse} from "./data.ts";

export const simplifyCourse = (course: ExtendedCourse) => ({
    code: course.code,
    id_ref: course.id_ref,
    name: course.name,
})
