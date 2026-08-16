// import bcrypt from "bcrypt";

// export const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// };

// export const comparePassword = async (password, hash) => {
//   return bcrypt.compare(password, hash);
// };

// import bcrypt from "bcrypt";

// // Hash a plain password
// export const hashPassword = async (password) => {
//   const saltRounds = 10; // standard cost factor
//   const salt = await bcrypt.genSalt(saltRounds);
//   return await bcrypt.hash(password, salt);
// };

// // Compare a plain password with a hashed one
// export const comparePassword = async (password, hash) => {
//   return await bcrypt.compare(password, hash);
// };


import bcrypt from "bcrypt";

// Hash a plain password
export const hashPassword = async (password) => {
  const saltRounds = 10; // cost factor
  return await bcrypt.hash(password, saltRounds);
};

// Compare a plain password with a hashed one
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};