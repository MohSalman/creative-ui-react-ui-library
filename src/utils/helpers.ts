/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Generate unique ID
   */
  export const generateId = (prefix: string = 'id'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  };
  
  /**
   * Check if value is empty (null, undefined, or empty string)
   */
  export const isEmpty = (value: unknown): boolean => {
    return value === null || value === undefined || value === '';
  };
  
  /**
   * Deep merge objects
   */
  export const deepMerge = <T extends Record<string, unknown>>(
    target: T,
    source: Partial<T>
  ): T => {
    const output = { ...target } as Record<string, unknown>;
    
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        const sourceValue = source[key];
        const targetValue = target[key];
        
        if (isObject(sourceValue) && isObject(targetValue)) {
          output[key] = deepMerge(
            targetValue as Record<string, unknown>,
            sourceValue as Record<string, unknown>
          );
        } else if (sourceValue !== undefined) {
          output[key] = sourceValue;
        }
      });
    }
    
    return output as T;
  };
  
  const isObject = (item: unknown): item is Record<string, unknown> => {
    return item !== null && typeof item === 'object' && !Array.isArray(item);
  };