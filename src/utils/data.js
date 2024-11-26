import { faker } from '@faker-js/faker';

export const generateProducts = (count = 10) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(), // Correct method for generating UUIDs in version 9.2.0
    name: faker.commerce.productName(),
    price: faker.commerce.price({ min: 10, max: 100 }), // Adjusted for newer API
    image: faker.image.urlLoremFlickr({ category: 'product' }), // Updated image method
  }));
};
