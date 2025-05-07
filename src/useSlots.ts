/**
 * MIT License
 *
 * Copyright (c) 2018 GitHub, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react';
import { error } from './error';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Props = any;

type ComponentMatcher = React.ElementType<Props>;
type ComponentAndPropsMatcher = [ComponentMatcher, (props: Props) => boolean];

export type SlotConfig = Record<
  string,
  ComponentMatcher | ComponentAndPropsMatcher
>;

type SlotElements<Config extends SlotConfig> = {
  [Property in keyof Config]: SlotValue<Config, Property>;
};

type SlotValue<
  Config,
  Property extends keyof Config,
> = Config[Property] extends React.ElementType
  ? React.ReactElement<
      React.ComponentPropsWithoutRef<Config[Property]>,
      Config[Property]
    >
  : Config[Property] extends readonly [
        infer ElementType extends React.ElementType,
        infer _testFn,
      ]
    ? React.ReactElement<
        React.ComponentPropsWithoutRef<ElementType>,
        ElementType
      >
    : never;

export function useSlots<Config extends SlotConfig>(
  children: React.ReactNode,
  config: Config,
): [Partial<SlotElements<Config>>, React.ReactNode[]] {
  const defaults: React.ReactNode[] = [];
  const keys = Object.keys(config) as Array<keyof Config>;
  const values = Object.values(config);
  const slots = keys.reduce(
    (_slots, key) => {
      _slots[key] = undefined;

      return _slots;
    },
    {} as Partial<SlotElements<Config>>,
  );

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      defaults.push(child);

      return;
    }

    const index = values.findIndex((value) => {
      if (Array.isArray(value)) {
        const [component, testFn] = value;

        return child.type === component && testFn(child.props);
      }

      return child.type === value;
    });

    if (index === -1) {
      defaults.push(child);

      return;
    }

    const slotKey = keys[index];

    if (slots[slotKey]) {
      error(
        `Found duplicate "${String(slotKey)}" slot. Only the first will be rendered.`,
      );

      return;
    }

    slots[slotKey] = child as SlotValue<Config, keyof Config>;
  });

  return [slots, defaults];
}
