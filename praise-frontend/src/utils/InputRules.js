export const NAME_RULES = {
  required: "Full name is required",
  minLength: {
    value: 2,
    message: "Full name should have at least 2 characters!",
  },
  pattern: {
    value: /^[A-Za-z\s]+$/,
    message: "Full name must contain only letters",
  },
  maxLength: {
    value: 20,
    message: "Full name should not exceed 20 characters",
  },
};

export const PASSWORD_RULES = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
  maxLength: {
    value: 16,
    message: "Password should not exceed 16 characters",
  },
};

export const PRODUCT_NAME_RULES = {
  required: "Product name is required",
  minLength: {
    value: 2,
    message: "Product name should have at least 2 characters",
  },
  maxLength: {
    value: 20,
    message: "Product name should not exceed 20 characters",
  },
};

export const DESCRIPTION_RULES = {
  maxLength: {
    value: 50,
    message: "Description should not exceed 50 characters",
  },
};

export const PRODUCT_DESCRIPTION_RULES = {
  required: "Description is required",
  maxLength: {
    value: 250,
    message: "Description should not exceed 250 characters",
  },
};

export const COMPLAINT_DESCRIPTION_RULES = {
  required: "Description is required",
  minLength: {
    value: 10,
    message: "Must be at least 10 characters",
  },
  maxLength: {
    value: 500,
    message: "Description should not exceed 500 characters",
  },
};

export const PHONE_RULES = {
  required: "Contact phone is required",
  pattern: {
    value: /^(?:\((0[1-9])\)\s?|9)\d{4}\s?\d{4}$/,
    message: "Invalid Chilean phone number format!",
  },
};

export const EMAIL_RULES = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "Invalid email format!",
  },
};

export const IMAGE_RULES = {
  required: "You must select an image!",
};

export const PRICE_RULES = {
  required: "Price is required",
  pattern: {
    value: /^[+]?([0-9]*[.])?[0-9]+$/,
    message: "Price should be a positive number",
  },
  maxLength: {
    value: 7,
    message: "Price should not exceed 7 characters",
  },
};

export const CATEGORY_RULES = {
  required: "Category is required",
};

export const CONDITION_RULES = {
  required: "Condition is required",
};
