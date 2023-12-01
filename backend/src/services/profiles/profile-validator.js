const { throwExeptionIfEmptyString } = require('../../common/validations/string-validator');

const { GENDERS } = require('../../common/constants/constants');

const validateProfile = function (profile) {
  validateName(profile.name);
  validateLastname(profile.lastname);
  validateGender(profile.gender);
  validateRegion(profile.region);
  validateCountry(profile.country);
};

const validateName = function (name) {
  throwExeptionIfEmptyString(name, 'Name is required');
};

const validateLastname = function (lastname) {
  throwExeptionIfEmptyString(lastname, 'Lastname is required');
};

const validateGender = function (gender) {
  if (gender) {
    if (!GENDERS.includes(gender)) {
      throwExeptionIfEmptyString('', 'Gender is not valid');
    }
  } else {
    throwExeptionIfEmptyString('', 'Gender is required');
  }
};

const validateRegion = function (region) {
  throwExeptionIfEmptyString(region, 'Region is required');
};

const validateCountry = function (country) {
  throwExeptionIfEmptyString(country, 'Country is required');
};

module.exports = { validateProfile };
