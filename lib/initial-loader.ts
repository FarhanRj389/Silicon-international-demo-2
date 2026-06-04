/** Tracks whether the splash loader has finished in this browser session (resets on full reload). */
let loaderCompleted = false

export function shouldShowInitialLoader(): boolean {
  return !loaderCompleted
}

export function markInitialLoaderComplete(): void {
  loaderCompleted = true
}
