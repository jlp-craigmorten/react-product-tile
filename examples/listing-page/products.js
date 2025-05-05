const productNames = [
  "Classic T-Shirt",
  "Slim Fit Jeans",
  "Wireless Headphones",
  "Smart Watch",
  "Running Shoes",
  "Laptop Backpack",
  "Water Bottle",
  "Bluetooth Speaker",
  "Leather Wallet",
  "Sunglasses",
  "Yoga Mat",
  "Coffee Mug",
  "Plant Pot",
  "Desk Lamp",
  "Kitchen Knife Set",
];

const brands = [
  "TechGear",
  "UrbanStyle",
  "EcoLife",
  "HomeEssentials",
  "ActiveWear",
  "LuxuryFinds",
  "ModernLiving",
  "OutdoorAdventure",
  "SmartHome",
  "PremiumChoice",
];

const colors = [
  "Black",
  "White",
  "Navy",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
  "Brown",
  "Pink",
];

const tags = [
  "new",
  "hot",
  "limited",
  "sale",
  "exclusive",
  "bestseller",
  "organic",
  "eco-friendly",
];

const descriptionTemplates = [
  "{brand} {color} {name} - Premium quality product for everyday use.",
  "Stylish {color} {name} by {brand} - Perfect for any occasion.",
  "{brand} {name} in {color} - Designed for comfort and durability.",
  "Sleek {color} {name} from {brand} - Modern design meets functionality.",
  "Handcrafted {brand} {name} in {color} - Exceptional attention to detail.",
];

const generateRandomPrice = () => {
  const basePrice = Math.floor(Math.random() * 200) + 10;
  const pence = Math.floor(Math.random() * 100);
  return `£${basePrice}.${pence < 10 ? `0${pence}` : pence}`;
};

const generateRandomImageUrl = (id) => {
  return `https://placedog.net/300/300?id=${id}`;
};

const generateProducts = (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const name = productNames[Math.floor(Math.random() * productNames.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const descriptionTemplate =
      descriptionTemplates[
        Math.floor(Math.random() * descriptionTemplates.length)
      ];

    const description = descriptionTemplate
      .replace("{brand}", brand)
      .replace("{color}", color)
      .replace("{name}", name);

    const hasReview = Math.random() > 0.4;
    const review = hasReview ? Math.floor(Math.random() * 5) + 1 : undefined;

    const hasTag = Math.random() > 0.6;
    const tag = hasTag
      ? tags[Math.floor(Math.random() * tags.length)]
      : undefined;

    products.push({
      id: i + 1,
      image: generateRandomImageUrl(i + 1),
      description: description,
      review,
      price: generateRandomPrice(),
      tag,
    });
  }

  return products;
};

export const getProducts = () => generateProducts(24);
