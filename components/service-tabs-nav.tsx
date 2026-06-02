'use client'

import Link from 'next/link'
import { serviceTabs } from '@/components/services-content'

type ServiceTabsNavProps = {
  activeId?: string
}

export function ServiceTabsNav({ activeId }: ServiceTabsNavProps) {
  return (
    <section className="bg-card border-b border-border sticky top-[4.5rem] lg:top-20 z-40 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
          {serviceTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeId === tab.id
            return (
              <Link
                key={tab.id}
                href={`/services/${tab.id}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg whitespace-nowrap text-sm font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
