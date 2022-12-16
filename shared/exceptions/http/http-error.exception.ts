import { HttpCode } from "../../common/enums/enums";

const DEFAULT_SERVER_ERROR = "Network error";

type Constructor = {
  message?: string;
  status?: number;
  cause?: unknown;
};

class HttpError extends Error {
  public status: HttpCode;
  public cause?: unknown;

  constructor({
    message = DEFAULT_SERVER_ERROR,
    status = HttpCode.INTERNAL_SERVER_ERROR,
    cause,
  }: Constructor = {}) {
    super(message);
    this.message = message;
    this.status = status;
    this.cause = cause as Error;
  }
}

export { HttpError };
