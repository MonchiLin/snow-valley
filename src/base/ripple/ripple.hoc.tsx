import React, { ComponentProps, ComponentType, ForwardedRef, forwardRef } from 'react';
import { Ripple } from './ripple';
import type { RippleConfig } from './ripple.types';

type InstanceType<T> = T extends new (...args: any) => infer R ? R : any;

export function withRipple<WC extends ComponentType>(
  OComponent: WC,
  rippleConfig: RippleConfig = {}
) {
  return forwardRef((props: ComponentProps<WC>, ref: ForwardedRef<InstanceType<WC>>) => {
    return (
      <Ripple {...rippleConfig}>
        {/* @ts-ignore */}
        <OComponent {...props} ref={ref} />
      </Ripple>
    );
  });
}
