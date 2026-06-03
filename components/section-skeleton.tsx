export function SectionSkeleton() {
  return (
    <div className="section-padding container-site" aria-hidden>
      <div className="h-10 w-48 mx-auto mb-8 rounded-lg bg-secondary/50 animate-pulse" />
      <div className="space-y-6">
        <div className="h-64 rounded-2xl bg-secondary/40 animate-pulse" />
        <div className="h-64 rounded-2xl bg-secondary/40 animate-pulse" />
      </div>
    </div>
  )
}
