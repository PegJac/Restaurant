interface IMenuItems {
  name: string;
  price: number;
  category: string;
}

export const menuItems: IMenuItems[] = [
  { name: "Avocado Toast", price: 80, category: "food" },
  { name: "Pancakes", price: 80, category: "food" },
  { name: "Scrambled Eggs", price: 60, category: "food" },
  { name: "Eggs On Toast", price: 75, category: "food" },
  { name: "Acai Bowl", price: 85, category: "food" },
  { name: "English Breakfast", price: 120, category: "food" },
  { name: "Brew Coffee", price: 35, category: "drink" },
  { name: "Capuccino", price: 40, category: "drink" },
  { name: "Latte", price: 45, category: "drink" },
  { name: "Espresso", price: 40, category: "drink" },
  { name: "Tea", price: 30, category: "drink" },
  { name: "Juice", price: 60, category: "drink" },
];
