const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

type CachedPayload<T> = {
  data: T
  expiresAt: number
}

export function saveFormCache<T>(key: string, data: T) {
  if (typeof window === 'undefined') return
  const payload: CachedPayload<T> = {
    data,
    expiresAt: Date.now() + ONE_WEEK_MS,
  }
  try {
    localStorage.setItem(key, JSON.stringify(payload))
  } catch {
    /* quota exceeded — ignore */
  }
}

export function loadFormCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedPayload<T>
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem(key)
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}

export function clearFormCache(key: string) {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}

type SessionData = {
  id: string
  startedAt: number
  visitCount: number
}

export function initSession(sessionKey: string): SessionData {
  if (typeof window === 'undefined') {
    return { id: 'ssr', startedAt: Date.now(), visitCount: 1 }
  }

  try {
    const existing = sessionStorage.getItem(sessionKey)
    if (existing) {
      const parsed = JSON.parse(existing) as SessionData
      parsed.visitCount += 1
      sessionStorage.setItem(sessionKey, JSON.stringify(parsed))
      return parsed
    }

    const session: SessionData = {
      id: crypto.randomUUID(),
      startedAt: Date.now(),
      visitCount: 1,
    }
    sessionStorage.setItem(sessionKey, JSON.stringify(session))
    return session
  } catch {
    return { id: 'unknown', startedAt: Date.now(), visitCount: 1 }
  }
}

export function getSession(sessionKey: string): SessionData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(sessionKey)
    return raw ? (JSON.parse(raw) as SessionData) : null
  } catch {
    return null
  }
}
