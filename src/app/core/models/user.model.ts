export interface User {
  readonly name: string;
  readonly level: string;
  /** Hex color (`#rrggbb`) used to highlight the user level. */
  readonly levelColor: string;
  readonly avatarUrl?: string;
}
