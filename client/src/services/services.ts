import { Http } from "./http/http.service";
import { Discipline } from "./discipline/discipline.service";
import { Faculty } from "./faculty/faculty.service";
import { Teacher } from "./teacher/teacher.service";
import { ENV } from "@/common/enums/enums";

const apiPrefix = ENV.API.PATH;

const http = new Http();
const discipline = new Discipline({ http, apiPrefix });
const faculty = new Faculty({ http, apiPrefix });
const teacher = new Teacher({ http, apiPrefix });

export { discipline, faculty, teacher };
