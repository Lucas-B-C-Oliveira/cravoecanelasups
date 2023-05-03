export function getUrlParams(url: string): Record<string, string> | string {
  const params = new URLSearchParams(new URL(url).search)
  const result: Record<string, string> = {}

  const entries = Array.from(params.entries())
  for (const [key, value] of entries) {
    result[key] = value
  }

  const keys = Object.keys(result)

  return keys.length === 1 ? result[keys[0]] : result
}
