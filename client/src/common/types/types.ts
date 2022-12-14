export {
  type AxiosInstance,
  type AxiosResponse,
  type Method,
  type RawAxiosRequestHeaders,
} from "./axios/axios";
export { type Component, type ToggleState } from "./components/components";
export {
  type CreateDepartmentRequestDto,
  type DepartmentsGetAllItemResponseDto,
  type DepartmentsGetAllResponseDto,
  type UpdateDepartmentRequestParams,
  type UpdateDepartmentRequestDto,
} from "./departments/departments";
export {
  type CreateDisciplineRequestDto,
  type DisciplinesGetAllItemResponseDto,
  type DisciplinesGetAllResponseDto,
  type UpdateDisciplineRequestDto,
  type UpdateDisciplineRequestParams,
} from "./disciplines/disciplines";
export {
  type CreateFacultyRequestDto,
  type FacultiesGetAllItemResponseDto,
  type FacultiesGetAllResponseDto,
  type UpdateFacultyRequestDto,
  type UpdateFacultyRequestParams,
} from "./faculties/faculties";
export {
  type CreateFaqMessageRequestDto,
  type FaqMessagesGetAllItemResponseDto,
  type FaqMessagesGetAllResponseDto,
} from "./faq-messages/faq-messages";
export {
  type CreateGrantRequestDto,
  type UpdateGrantRequestDto,
  type GrantsGetAllAdminResponseDto,
  type GrantsGetAllItemAdminResponseDto,
  type UpdateGrantRequestParams,
} from "./grants/grants";
export {
  type CreateGroupRequestDto,
  type GroupsGetAllItemResponseDto,
  type GroupsGetAllResponseDto,
  type UpdateGroupRequestDto,
  type UpdateGroupRequestParams,
} from "./groups/groups";
export { type HttpOptions } from "./http/http";
export {
  type CreateNewsRequestDto,
  type NewsGetAllItemResponseDto,
  type NewsGetAllResponseDto,
  type UpdateNewsRequestDto,
  type UpdateNewsRequestParams,
} from "./news/news";
export {
  type CreateScheduleRequestDto,
  type SchedulesGetAllItemResponseDto,
  type SchedulesGetAllResponseDto,
  type UpdateScheduleRequestDto,
  type UpdateScheduleRequestParams,
} from "./schedules/schedules";
export {
  type CreateStudentRequestDto,
  type StudentsGetAllItemResponseDto,
  type StudentsGetAllResponseDto,
  type UpdateStudentRequestDto,
  type UpdateStudentRequestParams,
} from "./students/students";
export {
  type CreateTeacherRequestDto,
  type TeachersGetAllItemResponseDto,
  type TeachersGetAllResponseDto,
  type UpdateTeacherRequestDto,
  type UpdateTeacherRequestParams,
} from "./teachers/teachers";
export {
  type UpdateUserRequestDto,
  type UpdateUserRequestParams,
  type UsersGetAllAdminResponseDto,
  type UsersGetAllItemAdminResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
  type UserWithGrantDto,
} from "./users/users";
