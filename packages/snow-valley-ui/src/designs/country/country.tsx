export interface ICountry {
  name: string;
  code: string;
  flag: string;
  placeholder: string;
}

export class Country implements ICountry {
  readonly name: string;
  readonly code: string;
  readonly flag: string;
  readonly placeholder: string;

  constructor(props: ICountry) {
    this.name = props.name;
    this.code = props.code;
    this.flag = props.flag;
    this.placeholder = props.placeholder;
  }

  /**
   * 扁平化, 转换为 JS 普通对象
   */
  plainlize(): ICountry {
    return {
      name: this.name,
      code: this.code,
      flag: this.flag,
      placeholder: this.placeholder,
    };
  }

  format() {
    return `${this.flag} ${this.name}`;
  }
}

export class CountryGroup {
  private countries: Country[];

  constructor(countries: Country[]) {
    this.countries = countries;
  }

  indexOf(index: number): Country | undefined {
    return this.countries[index];
  }

  findCountryByCode(code: string): Country | null {
    return this.countries.find((c) => c.code === code) || null;
  }

  findCountryByName(name: string): Country | null {
    return this.countries.find((c) => c.name === name) || null;
  }
}
