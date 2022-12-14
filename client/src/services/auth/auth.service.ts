import {
  ApiPath,
  AuthApi,
  ContentType,
  HttpMethod,
} from "@/common/enums/enums";
import type {
  UsersGetAllItemAdminResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UpdateUserRequestDto,
  UserWithGrantDto,
} from "@/common/types/types";
import type { Http as HttpService } from "../http/http.service";

type Constructor = {
  http: HttpService;
  apiPrefix: string;
};

class Auth {
  #http: HttpService;

  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.#http.load<UserSignUpResponseDto>(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApi.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
        hasAuth: false,
      }
    );
  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#http.load<UserSignUpResponseDto>(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApi.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
        hasAuth: false,
      }
    );
  }

  public getCurrentUser(): Promise<UserWithGrantDto> {
    return this.#http.load<UserWithGrantDto>(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApi.CURRENT_USER}`,
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      }
    );
  }

  public updateUser(
    id: number,
    payload: UpdateUserRequestDto
  ): Promise<UsersGetAllItemAdminResponseDto> {
    return this.#http.load<UsersGetAllItemAdminResponseDto>(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApi.EDIT_USER}/${id}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: new URLSearchParams(payload),
      }
    );
  }
}

export { Auth };
