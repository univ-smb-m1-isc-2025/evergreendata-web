import { Documentation } from "./Documentation"; 

export interface SubjectCriteria {
    subjectId: number;
    criteriaId: number;
    name: string;
    documentations: Documentation[];
}