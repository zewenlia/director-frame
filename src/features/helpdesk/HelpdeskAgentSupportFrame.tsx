import {
  Headphones,
  Inbox,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
} from 'lucide-react'
import { useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
} from '@/design-system/components'
import { cn } from '@/lib/cn'

type Priority = 'high' | 'medium' | 'low'

type Ticket = {
  id: string
  subject: string
  requester: string
  updated: string
  priority: Priority
  unread?: boolean
}

type Message = {
  id: string
  author: 'customer' | 'agent'
  name: string
  initials: string
  body: string
  time: string
}

const TICKETS: Ticket[] = [
  {
    id: 'HD-2841',
    subject: 'VPN drops after sleep on macOS',
    requester: 'Alex Rivera',
    updated: '2m ago',
    priority: 'high',
    unread: true,
  },
  {
    id: 'HD-2837',
    subject: 'Reset MFA for payroll app',
    requester: 'Jordan Lee',
    updated: '18m ago',
    priority: 'medium',
  },
  {
    id: 'HD-2829',
    subject: 'New hire laptop provisioning',
    requester: 'Sam Patel',
    updated: '1h ago',
    priority: 'low',
  },
]

const THREAD: Message[] = [
  {
    id: 'm1',
    author: 'customer',
    name: 'Alex Rivera',
    initials: 'AR',
    body: 'Hi — my VPN disconnects every time the Mac sleeps. I already reinstalled the client. Can someone take a look?',
    time: '10:12 AM',
  },
  {
    id: 'm2',
    author: 'agent',
    name: 'You',
    initials: 'AG',
    body: 'Thanks Alex. I see your device on the latest build. Can you confirm whether this happens on Wi‑Fi only or also on wired dock?',
    time: '10:14 AM',
  },
  {
    id: 'm3',
    author: 'customer',
    name: 'Alex Rivera',
    initials: 'AR',
    body: 'Only on Wi‑Fi. Wired dock is stable.',
    time: '10:16 AM',
  },
]

function priorityBadge(priority: Priority) {
  switch (priority) {
    case 'high':
      return <Badge variant="warning">High</Badge>
    case 'medium':
      return <Badge variant="secondary">Medium</Badge>
    default:
      return <Badge variant="outline">Low</Badge>
  }
}

export function HelpdeskAgentSupportFrame() {
  const [selectedId, setSelectedId] = useState(TICKETS[0]?.id ?? '')
  const selected = TICKETS.find((t) => t.id === selectedId) ?? TICKETS[0]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top app bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground">
              <Headphones className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-semibold tracking-tight">
                Director Helpdesk
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Agent · Support queue
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" className="gap-1.5 pr-2.5">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden
              />
              Online
            </Badge>
            <Button variant="outline" size="sm" type="button">
              <Inbox className="h-4 w-4" aria-hidden />
              Snooze
            </Button>
            <Button variant="ghost" size="sm" type="button" className="px-2">
              <span className="sr-only">More</span>
              <MoreHorizontal className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-0 lg:flex-row">
        {/* Ticket list */}
        <aside className="flex w-full shrink-0 flex-col border-b border-border bg-muted/30 lg:w-[380px] lg:border-b-0 lg:border-r">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                name="ticket-search"
                placeholder="Search tickets…"
                aria-label="Search tickets"
                className="pl-9"
              />
            </div>
          </div>
          <div className="p-2">
            <p className="px-2 pb-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Open · {TICKETS.length}
            </p>
            <ul className="flex flex-col gap-1">
              {TICKETS.map((t) => {
                const active = t.id === selectedId
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(t.id)}
                      className={cn(
                        'w-full rounded-[var(--radius-md)] border px-3 py-3 text-left transition-colors',
                        active
                          ? 'border-border bg-card shadow-sm'
                          : 'border-transparent hover:bg-muted/80',
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {t.id}
                        </span>
                        {priorityBadge(t.priority)}
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm font-medium">
                        {t.subject}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="truncate">{t.requester}</span>
                        <span className="shrink-0">{t.updated}</span>
                      </div>
                      {t.unread ? (
                        <span className="mt-2 inline-flex h-2 w-2 rounded-full bg-accent" />
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Conversation */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
          {selected ? (
            <>
              <div className="border-b border-border px-4 py-4 md:px-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 text-left">
                    <h1 className="text-lg font-semibold tracking-tight md:text-xl">
                      {selected.subject}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selected.id} · {selected.requester}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" type="button">
                      Assign
                    </Button>
                    <Button variant="outline" size="sm" type="button">
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 md:px-6">
                {THREAD.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      'flex gap-3',
                      m.author === 'agent' ? 'flex-row-reverse' : 'flex-row',
                    )}
                  >
                    <Avatar
                      initials={m.initials}
                      label={m.name}
                      size="md"
                      className={
                        m.author === 'agent'
                          ? 'bg-primary text-primary-foreground ring-primary/20'
                          : undefined
                      }
                    />
                    <Card
                      className={cn(
                        'max-w-[min(100%,560px)] border',
                        m.author === 'agent'
                          ? 'border-primary/15 bg-primary/5'
                          : 'border-border bg-card',
                      )}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-baseline justify-between gap-4">
                          <CardTitle className="text-sm font-medium">
                            {m.name}
                          </CardTitle>
                          <span className="text-xs text-muted-foreground">
                            {m.time}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm leading-relaxed text-foreground">
                          {m.body}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="border-t border-border bg-muted/20 p-4 md:p-6">
                <Textarea
                  name="reply"
                  label="Reply"
                  placeholder="Write a reply to the customer…"
                  className="min-h-[120px] bg-card"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <Button variant="ghost" size="sm" type="button">
                    <Paperclip className="h-4 w-4" aria-hidden />
                    Attach
                  </Button>
                  <Button size="md" type="button">
                    <Send className="h-4 w-4" aria-hidden />
                    Send reply
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </main>
      </div>

    </div>
  )
}
