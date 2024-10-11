// global.d.ts
export {}

declare global {
  interface Window {
    H: any; // or the specific type if you know it
  }
}
