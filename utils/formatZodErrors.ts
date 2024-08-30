import type { ZodErrors } from '../types/zodErrors';

export const formatZodErrors = (errors: any): ZodErrors => {
    const formattedErrors: ZodErrors = {};

    for (const key in errors) {
      if (errors[key] instanceof Object && !Array.isArray(errors[key])) {
        formattedErrors[key] = formatZodErrors(errors[key]);
      } else {
        formattedErrors[key] = errors[key].join(' ');
      }
    }

    return formattedErrors;
};