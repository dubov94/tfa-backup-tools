declare module 'secrets.js' {
  export function str2hex(string): string
  export function share(string, number, number, number): string[]
}