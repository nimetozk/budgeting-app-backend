import * as categoryRepository from "../repositories/category-repository";
import argon2 from "argon2";
import bcrypt from "bcrypt";

export class Result {
  isError = false;
  value = null;
  message = "";
}

export const IsnullOrEmpty = (value) => {
  if (typeof value !== "string") {
    return !Boolean(value);
  }

  if (!value || !value.trim().length) return true;

  return false;
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

export const hashPassword = async (plainPassword) => {
  return argon2.hash(plainPassword, { type: argon2.argon2id });
};

export const checkPassword = async (hash, plainPassword) => {
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
