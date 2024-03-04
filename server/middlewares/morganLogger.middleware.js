import morgan from "morgan";
import logger from "../utils/winstonLogger.js";

const stream = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  // ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  JSON.stringify({
    method: ':method',
    url: ':url',
    http_version: ':http-version',
    remote_addr: ':remote-addr',
    response_time: ':response-time',
    status: ':status',
    content_length: ':res[content-length]',
    timestamp: ':date[iso]',
    user_agent: ':user-agent',
  }),
  { stream, skip }
);

export default morganMiddleware;