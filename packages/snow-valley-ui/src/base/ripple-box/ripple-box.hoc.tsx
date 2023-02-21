import React, { ComponentProps, ComponentType, ForwardedRef, forwardRef } from 'react';
import { RippleBox } from './ripple-box';
import type { RippleBoxConfig } from './ripple-box.types';

type InstanceType<T> = T extends new (...args: any) => infer R ? R : any;

export function withRipple<WC extends ComponentType>(OComponent: WC, rippleConfig: RippleBoxConfig = {}) {
  return forwardRef((props: ComponentProps<WC>, ref: ForwardedRef<InstanceType<WC>>) => {
    return (
      <RippleBox {...rippleConfig}>
        {/* @ts-ignore */}
        <OComponent {...props} ref={ref} />
      </RippleBox>
    );
  });
}
