export const basePath = "/mycalie"

export function getAssetPath(path: string): string {
  if (path.startsWith("http")) {
    return path
  }
  return `${basePath}${path}`
}
