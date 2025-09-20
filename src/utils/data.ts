import {getSourceUrl} from "./config.ts";
import axios from "axios";

export type ExtendedProgram = {
    courses: Array<Pick<ExtendedCourse, "code" | "id_ref">>
    id_ref: string
}

export type ExtendedCourse = {
    name: string;
    id_ref: string
    code: string
    prerequisites: Array<string[]>
    corequisites: Array<string[]>
    equivalences: Array<string[]>
}

export type ExtendedSection = {
    course: Pick<ExtendedCourse, "code" | "name">
    id_ref: string
}

export type DataSource = {
    programs: Record<string, ExtendedProgram>
    courses: Record<string, ExtendedCourse>
    sections: Record<string, ExtendedSection>
}

const getData = () => axios.get<DataSource>(getSourceUrl(), { validateStatus: () => true })

export const dataSource = getData().then(aResponse => aResponse.data)

export const getPrograms = () => dataSource.then(aResponse => Object.values(aResponse['programs'] ?? {})).catch(() => [])
export const getCourses = () => dataSource.then(aResponse => Object.values(aResponse['courses'] ?? {})).catch(() => [])
export const getSections = () => dataSource.then(aResponse => Object.values(aResponse['sections'] ?? {})).catch(() => [])

 const getDictionaryCourses = async () => {
    const courses = await getCourses()
    return Object.fromEntries(
        courses.map(aCourse => [aCourse.code, aCourse])
    )
}
console.log(await getDictionaryCourses())

export const dictionaryCourses = getDictionaryCourses()
