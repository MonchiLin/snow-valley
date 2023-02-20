import { SnowVallyTheme } from '../theme';

describe('SnowVallyTheme', () => {
  it('Should extend `The Token Object` while compiling', () => {
    SnowVallyTheme.injectAToken({ textPrimaryColor: { light: 'white', dark: 'white' } });
    expect(SnowVallyTheme.token.textPrimaryColor.light).toBe('white');
  });

  it('Should extend `The Token Object` during compilation with deep merge', () => {
    SnowVallyTheme.injectAToken({
      textPrimaryColor: { light: 'white', dark: 'white' },
      textNormalColor: { light: 'black', dark: 'black' },
    });
    expect(SnowVallyTheme.token.textPrimaryColor.light).toBe('white');
    expect(SnowVallyTheme.token.textPrimaryColor.dark).toBe('white');
    expect(SnowVallyTheme.token.textNormalColor.light).toBe('black');
    expect(SnowVallyTheme.token.textNormalColor.dark).toBe('black');
  });

  it('Should extend `The Feature Object` while compiling', () => {
    SnowVallyTheme.injectAComponentToken({ Toast: { zIndex: 1000 } });
    expect(SnowVallyTheme.componentToken.Toast.zIndex).toBe(1000);
  });

  it('Should extend `The Feature Object` during compilation with deep merge', () => {
    SnowVallyTheme.injectAComponentToken({ FloatingInput: { unFocused: { labelColor: 'white' } } });
    expect(SnowVallyTheme.componentToken.FloatingInput.unFocused.labelColor).toBe('white');
    SnowVallyTheme.injectAComponentToken({ FloatingInput: { unFocused: { labelColor: 'black' } } });
    expect(SnowVallyTheme.componentToken.FloatingInput.unFocused.labelColor).toBe('black');
  });

  // 应该正确替换 $ 开头的变量
  it('Should replace `$` variable correctly', () => {
    SnowVallyTheme.injectAComponentToken({
      FloatingInput: { unFocused: { labelColor: '$textPrimaryColor' } },
    });
    SnowVallyTheme.replaceComponentVariable(SnowVallyTheme.componentToken, SnowVallyTheme.token);
    expect(SnowVallyTheme.componentToken.FloatingInput.unFocused.labelColor).toBe(
      SnowVallyTheme.token.textPrimaryColor.light
    );
  });
});
