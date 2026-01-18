/**
 * Combines class names, filtering out falsy values
 * @param classes - Array of class names or undefined/null values
 * @returns Combined class string
 */
export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
    return classes
      .filter((cls) => cls !== null && cls !== undefined && cls !== false && cls !== '')
      .join(' ');
  };