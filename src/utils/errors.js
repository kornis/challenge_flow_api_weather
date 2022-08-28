import { HTTP_CODE_MESSAGES } from "./constants.js";

export class BaseError extends Error {
    constructor (message, statusCode, isOperational, description) {
    super(description)
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.message = message
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this)
    }
}

export class Api400Error extends BaseError {
    constructor (
    message,
    statusCode = 400,
    description = HTTP_CODE_MESSAGES[400],
    isOperational = true
    ) {
    super(message, statusCode, isOperational, description)
    }
}

export class Api404Error extends BaseError {
    constructor (
    message,
    statusCode = 404,
    description = HTTP_CODE_MESSAGES[404],
    isOperational = true
    ) {
    super(message, statusCode, isOperational, description)
    }
}