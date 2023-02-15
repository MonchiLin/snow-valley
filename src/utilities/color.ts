export namespace Color {
  /**
   * 将 hex 转换为 rgba
   */
  export function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /**
   * 将 rgba 转换为 hex
   */
  export function rgbaToHex(rgba: string): string {
    const [, r, g, b] = rgba.match(/(\d+),\s*(\d+),\s*(\d+)/) || [];
    return `#${[r, g, b].map((v) => (+v!).toString(16).padStart(2, '0')).join('')}`;
  }

  /**
   * 将 rgb 转换为 rgba
   */
  export function rgbToRgba(rgb: string, alpha: number): string {
    return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }

  /**
   * 将 hsl 转换为 rgba
   */
  export function hslToRgba(hsl: string, alpha: number): string {
    const [, h, s, l] = hsl.match(/(\d+),\s*(\d+%),\s*(\d+)%/) || [];
    const [r, g, b] = hslToRgb(+h!, +s!, +l!);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /**
   * 将 hsl 转换为 rgb
   */
  export function hslToRgb(h: number, s: number, l: number): string {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return `${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round(
      (b + m) * 255
    )}`;
  }

  /**
   * 将 hsla 转换为 rgba
   */
  export function hslaToRgba(hsla: string): string {
    const [, h, s, l, a] = hsla.match(/(\d+),\s*(\d+%),\s*(\d+)%,\s*(\d+(?:\.\d+)?)\)/) || [];
    const [r, g, b] = hslToRgb(+h!, +s!, +l!);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  /**
   * 判断颜色种类
   */
  export function colorType(color: string): 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' {
    if (color.startsWith('#')) {
      return 'hex';
    } else if (color.startsWith('rgb')) {
      return color.includes('a') ? 'rgba' : 'rgb';
    } else if (color.startsWith('hsl')) {
      return color.includes('a') ? 'hsla' : 'hsl';
    }

    return 'hex';
  }

  /**
   * 将任意颜色转换为 rgba
   */
  export function toRgba(color: string, alpha: number): string {
    const type = colorType(color);

    switch (type) {
      case 'hex':
        return hexToRgba(color, alpha);
      case 'rgb':
        return rgbToRgba(color, alpha);
      case 'rgba':
        // 处理 alpha
        return color.replace(/(\d+(?:\.\d+)?)\)/, `${alpha})`);
      case 'hsl':
        return hslToRgba(color, alpha);
      case 'hsla':
        return hslaToRgba(color);
    }
  }
}
