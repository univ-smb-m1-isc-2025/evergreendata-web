import { SubjectCriteria } from "./SubjectCriteria";
import { User } from "./User";

export interface SubjectFull {
    deputies: User[];
    title: string;
    id: number;
    subjectsCriteria: SubjectCriteria[];
}