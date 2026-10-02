/**
 * A navigation target. `internal` links are resolved by the Angular router,
 * `external` links are opened in a new browser context.
 */
export interface AppLink {
  readonly type: 'internal' | 'external';
  readonly url: string;
}
