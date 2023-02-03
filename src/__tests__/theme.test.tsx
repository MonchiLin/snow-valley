import { DEFAULT_COMPONENT, DEFAULT_TOKEN, replaceComponentVariable } from '../constants/theme';
import { cloneDeep } from 'lodash-es';

describe('Theme', () => {
  it('should replace reference value to token value', () => {
    const component = replaceComponentVariable(cloneDeep(DEFAULT_COMPONENT), DEFAULT_TOKEN);
    expect(component.FloatingInput.focused.labelColor).toBe(DEFAULT_TOKEN.textPrimaryColor);
  });
});
