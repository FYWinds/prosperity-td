/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-14 14:02:54
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-04-14 14:23:23
 * @FilePath     : /src/core/event/eventbus.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { EventHandler, EventListener } from "./eventhandler";
import { Event } from "./events/event";

export class EventBus {
  private static handlers: Map<
    string,
    Map<number, [handler: EventHandler, block: boolean][]>
  > = new Map();

  static registerHandler(
    event: typeof Event,
    priority?: number,
    block?: boolean
  ) {
    return function (
      target: EventListener,
      _propertyKey: string,
      _descriptor: PropertyDescriptor
    ) {
      EventBus.handlers
        .get(event.constructor.name)
        ?.get(priority ?? 0)
        ?.push([target.handler, block ?? false]) ??
        EventBus.handlers
          .get(event.constructor.name)
          ?.set(priority ?? 0, [[target.handler, block ?? false]]) ??
        EventBus.handlers.set(
          event.constructor.name,
          new Map([[priority ?? 0, [[target.handler, block ?? false]]]])
        );

      // sort handlers by priority
      EventBus.handlers.set(
        event.constructor.name,
        new Map(
          [...EventBus.handlers.get(event.constructor.name)!!.entries()].sort()
        )
      );
    };
  }

  static dispatch(event: Event) {
    let blockedPriority = Infinity;
    let blocked = false;
    EventBus.handlers
      .get(event.constructor.name)
      ?.forEach((handlers, priority) => {
        handlers.forEach((handler) => {
          handler[0](event, blocked);
          // log error if return false;
          if (handler[1] && blockedPriority > priority) {
            blockedPriority = priority;
            blocked = true;
          }
        });
      });
  }
}

export let registerEventHandler = EventBus.registerHandler;
