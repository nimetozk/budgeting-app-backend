/**
 * The code in this file provide functions that are used in different files to set business rules
 */
import * as categoryRepository from "../repositories/category-repository";
import argon2 from "argon2";
import bcrypt from "bcrypt";

export class Result {
  //isError = false;
  //value = null;
  //message = "";
  constructor(isError = false, value = null, message = "") {
    this.isError = isError;
    this.value = value;
    this.message = message;
  }
}

export const IsnullOrEmpty = (value) => {
  if (typeof value !== "string") {
    return !Boolean(value);
  }

  return !value || !value.trim().length;
};

export const assignCategories = async (desc = "") => {
  if (IsnullOrEmpty(desc)) {
    return await categoryRepository.getGeneralCategory();
  }

  let newArray = desc.split(" ");
  let category = null;
  newArray.filter((word) => word.length > 3);

  for (const word of newArray) {
    category = await categoryRepository.getWordCategoryId(word.toLowerCase());
    if (category) break;
  }

  if (!category) category = await categoryRepository.getGeneralCategory();

  return category;
};

export const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, { type: argon2.argon2id });
};

export const checkPassword = (hash, plainPassword) => {
  if (hash.indexOf("$argon2") === 0) {
    return argon2.verify(hash, plainPassword);
  }

  const finalHash = hash.replace("$2y$", "$2b$");
  return bcrypt.compare(plainPassword, finalHash);
};

export const errorToString = (error) => {
  let message = "";

  if (error.response && error.response.data) {
    message = error.response.data;
    return message;
  }

  if (error instanceof Error && error.message) {
    message += error.message;
  }

  if (error instanceof Error && error.stack) {
    message += ` | stack: ${error.stack}`;
  }

  if (message === "") return error;
  return message;
};

export const wrapFunction = (fn) => (req, res, next) => {
  return fn(req, res, next).catch(next);
};
