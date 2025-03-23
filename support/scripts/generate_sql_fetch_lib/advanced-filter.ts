/**
 * Operators you can use for filtering on a single column.
 */
export type FilterOperators<T> = {
    eq?: T;
    neq?: T;
    gt?: T;
    gte?: T;
    lt?: T;
    lte?: T;
    in?: T[];
    like?: string;
  };
  
  /**
   * Allows each key in T to be filtered with the available operators.
   */
  export type AdvancedFilter<T> = {
    [K in keyof T]?: FilterOperators<T[K]>;
  };