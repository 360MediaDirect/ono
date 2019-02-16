/**
 * The default export of the "ono" module.
 */
export interface OnoSingleton extends Ono<Error> {
  error: Ono<Error>;
  eval: Ono<EvalError>;
  range: Ono<RangeError>;
  reference: Ono<ReferenceError>;
  syntax: Ono<SyntaxError>;
  type: Ono<TypeError>;
  uri: Ono<URIError>;
  formatter: MessageFormatter;
}

/**
 * An `Ono` is a function that creates errors of a specific type.
 */
export interface Ono<T extends ErrorLike> {
  /**
   * Creates a new error with the message, stack trace, and properties of another error.
   *
   * @param error - The original error
   */
  (error: ErrorLike): T & OnoError;

  /**
   * Creates a new error with the message, stack trace, and properties of another error,
   * as well as aditional properties.
   *
   * @param error - The original error
   * @param props - An object whose properties will be added to the returned error
   */
  (error: ErrorLike, props: object): T & OnoError;

  /**
   * Creates a new error with a formatted message and the stack trace and properties of another error.
   *
   * @param error - The original error
   * @param message - The new error message, possibly including argument placeholders
   * @param params - Optional arguments to replace the corresponding placeholders in the message
   */
  (error: ErrorLike, message: string, ...params: Array<unknown>): T & OnoError;

  /**
   * Creates a new error with a formatted message and the stack trace and properties of another error,
   * as well as additional properties.
   *
   * @param error - The original error
   * @param props - An object whose properties will be added to the returned error
   * @param message - The new error message, possibly including argument placeholders
   * @param params - Optional arguments to replace the corresponding placeholders in the message
   */
  (error: ErrorLike, props: object, message: string, ...params: Array<unknown>): T & OnoError;

  /**
   * Creates an error with a formatted message.
   *
   * @param message - The new error message, possibly including argument placeholders
   * @param params - Optional arguments to replace the corresponding placeholders in the message
   */
  (message: string, ...params: Array<unknown>): T & OnoError;

  /**
   * Creates an error with additional properties.
   *
   * @param props - An object whose properties will be added to the returned error
   */
  (props: object): T & OnoError;

  /**
   * Creates an error with a formatted message and additional properties.
   *
   * @param props - An object whose properties will be added to the returned error
   * @param message - The new error message, possibly including argument placeholders
   * @param params - Optional arguments to replace the corresponding placeholders in the message
   */
  (props: object, message: string, ...params: Array<unknown>): T & OnoError;
}

/**
 * All error objects returned by Ono have these properties.
 */
export interface OnoError extends ErrorPOJO {
  /**
   * Returns a JSON representation of the error, including all built-in error properties,
   * as well as properties that were dynamically added.
   */
  toJSON(): object;

  /**
   * Returns a string representation of the error for debugging/logging purposes.
   */
  inspect(): string;
}

/**
 * An error object that doesn't inherit from the `Error` class, such as `DOMError`, `DOMException`,
 * and some third-party error types.
 */
export interface ErrorPOJO {
  message?: string;
  stack?: string;
  name?: string;
  [key: string]: unknown;
}

/**
 * Any object that "looks like" an `Error` object.
 */
export type ErrorLike = Error | ErrorPOJO;

/**
 * A constructor for `ErrorLike` objects.
 */
export type ErrorLikeConstructor<T extends ErrorLike = Error> =
  ErrorLikeConstructorFunction<T> | ErrorLikeConstructorClass<T>;


/**
 * A constructor function for `ErrorLike` objects.
 * Constructor functions can be called without the `new` keyword.
 *
 * @example
 *  throw TypeError();
 */
export interface ErrorLikeConstructorFunction<T extends ErrorLike> {
  readonly prototype: T;
  (): T;
}

/**
 * A constructor class for `ErrorLike` objects.
 * Constructor classes must be called with the `new` keyword.
 *
 * @example
 *  throw new TypeError();
 */
export interface ErrorLikeConstructorClass<T extends ErrorLike> {
  readonly prototype: T;
  new(...args: Array<unknown>): T;
}

/**
 * A function that accepts a message template and arguments to replace template parameters.
 *
 * @example
 *  format("Hello, %s! You have %d unread messages.", "John", 5);
 */
export type MessageFormatter = (message: string, ...args: Array<unknown>) => string;
