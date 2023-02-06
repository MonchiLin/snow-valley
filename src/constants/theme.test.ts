import { SnowVallyTheme } from '../constants/theme';

describe('SnowVallyTheme', () => {
  it('Should extend `The Token Object` while compiling', () => {
    SnowVallyTheme.injectToken({ textPrimaryColor: 'white' });
    expect(SnowVallyTheme.token.textPrimaryColor).toBe('white');
  });

  it('Should extend `The Token Object` during compilation with deep merge', () => {
    SnowVallyTheme.injectToken({ textPrimaryColor: 'white', textNormalColor: 'black' });
    expect(SnowVallyTheme.token.textPrimaryColor).toBe('white');
    expect(SnowVallyTheme.token.textNormalColor).toBe('black');
  });

  it('Should extend `The Feature Object` while compiling', () => {
    SnowVallyTheme.injectFeature({ Toast: { zIndex: 1000 } });
    expect(SnowVallyTheme.feature.Toast.zIndex).toBe(1000);
  });

  it('Should extend `The Feature Object` during compilation with deep merge', () => {
    SnowVallyTheme.injectFeature({ FloatingInput: { unFocused: { labelColor: 'white' } } });
    expect(SnowVallyTheme.feature.FloatingInput.unFocused.labelColor).toBe('white');
    SnowVallyTheme.injectFeature({ FloatingInput: { unFocused: { labelColor: 'black' } } });
    expect(SnowVallyTheme.feature.FloatingInput.unFocused.labelColor).toBe('black');
  });

  // 应该正确替换 $ 开头的变量
  it('Should replace `$` variable correctly', () => {
    SnowVallyTheme.injectFeature({
      FloatingInput: { unFocused: { labelColor: '$textPrimaryColor' } },
    });
    SnowVallyTheme.updateFeatureVariable();
    expect(SnowVallyTheme.feature.FloatingInput.unFocused.labelColor).toBe(
      SnowVallyTheme.token.textPrimaryColor
    );
  });
});
