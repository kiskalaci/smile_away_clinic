export enum PageMode {
  edit,
  view,
}
export function canEdit(mode: PageMode): boolean {
  return mode == PageMode.edit;
}
