type EventType = string | symbol

type Handler<T = any> = (e: T) => void
type Handlers<T = any> = Array<Handler<T>>

type HandlersMap<Events extends Record<EventType, any>> = Map<keyof Events, Handlers<Events[keyof Events]>>
export class Emitter<Events extends Record<EventType, any>> {
  all: HandlersMap<Events>

  constructor(all?: HandlersMap<Events>) {
    this.all = all || new Map()
  }

  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
    const handlers = this.all.get(type)
    if (handlers)
      handlers.push(handler as Handler)
    else
      this.all.set(type, [handler as Handler])
  }

  emit<Key extends keyof Events>(type: Key, event: Events[Key]) {
    const handlers = this.all.get(type)
    if (handlers)
      handlers.forEach(handler => handler(event))
  }

  off<Key extends keyof Events>(type: Key) {
    this.all.delete(type)
  }
}
