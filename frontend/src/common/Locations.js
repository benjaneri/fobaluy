export default class Regions {
  constructor() {
    this.countries = [
      {
        name: 'Uruguay',
        value: 'Uruguay',
      },
      {
        name: 'Argentina',
        value: 'Argentina',
      },
    ];
  }

  getCountries() {
    return this.countries;
  }

  getRegions(country) {
    switch (country) {
    case 'Uruguay':
      return [
        {
          name: 'Montevideo',
          value: 'Montevideo',
        },
        {
          name: 'Canelones',
          value: 'Canelones',
        },
        {
          name: 'Maldonado',
          value: 'Maldonado',
        },
        {
          name: 'Salto',
          value: 'Salto',
        },
      ];
    case 'Argentina':
      return [
        {
          name: 'Buenos Aires',
          value: 'Buenos Aires',
        },
        {
          name: 'Córdoba',
          value: 'Córdoba',
        },
      ];
    default:
      return [];
    }
  }
}
