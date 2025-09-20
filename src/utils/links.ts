import {getProjectUrl} from "./config.ts";

type HasRef = {
    id_ref: string
}

type HasCode = {
    code: string
}

export const getProgramDetailUrl = (program: HasRef) => [
    getProjectUrl(), 'api/v1/program', program.id_ref
].join('/')

export const getCourseDetailUrl = (program: HasRef) => [
    getProjectUrl(), 'api/v1/course', program.id_ref
].join('/')

export const getCodeCourseDetailUrl = (program: HasCode) => [
    getProjectUrl(), 'api/v1/course/code', program.code
].join('/')

export const getCodeCourseSectionsUrl = (program: HasCode) => [
    getProjectUrl(), 'api/v1/course', program.code, 'sections'
].join('/')


export const getProgramsUrl = () => [
    getProjectUrl(), 'api/v1/programs'
].join('/')

export const getCoursesUrl = () => [
    getProjectUrl(), 'api/v1/courses'
].join('/')

export const getSectionsUrl = () => [
    getProjectUrl(), 'api/v1/sections'
].join('/')

export const addProgramLinks = <T extends HasRef>(item: T) => ({
    ...item,
    detail_url: getProgramDetailUrl(item),
})

export const addCourseLinks = <T extends HasRef & Partial<HasCode>>(item: T) => ({
    ...item,
    detail_url: getCourseDetailUrl(item),
    ...(isCode(item) ? { code_url: getCodeCourseDetailUrl(item) } : {}),
    ...(isCode(item) ? { sections_url: getCodeCourseSectionsUrl(item) } : {})
})

export const isCode = (item: HasRef | HasCode): item is HasCode => 'code' in item && item.code.length > 0
