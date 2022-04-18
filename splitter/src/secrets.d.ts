declare module 'secrets.js' {
  export function str2hex(str: string): string
  export function hex2str(hex: string): string
  export function share(secret: string, shareCount: number, threshold: number, padLength: number): string[]
  export function combine(shares: string[]): string
}