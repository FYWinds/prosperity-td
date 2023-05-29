/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-13 09:19:29
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-04-13 11:02:14
 * @FilePath     : /src/js/core/event/eventhandler.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { Event } from "./events/event";

export type EventHandler = (event: Event, blocked?: boolean) => boolean;

export abstract class EventListener {
  abstract handler(event: Event, blocked?: boolean): boolean;
}
