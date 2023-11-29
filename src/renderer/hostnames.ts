
export { hostnames, getPagesPathByHostname }

const hostnames = new Map<Set<string>, string>([
  [
    new Set([ 'neocities.localhost' ]),
    '/neocities',
  ],
])

function getPagesPathByHostname(name: string) {
  for (const [names, path] of hostnames.entries()) {
    if (names.has(name)) return path
  }

  return ''
}