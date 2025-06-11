import type { NutritionData, CategoryInfo } from '@/types/nutrition';

export const nutritionData: NutritionData = {
  "Greens + Grains": {
    "Brown Rice": { calories: 310, carbohydrates_g: 68, total_fat_g: 5, protein_g: 5 },
    "Basmati Rice": { calories: 290, carbohydrates_g: 68, total_fat_g: 7, protein_g: 5 },
    "Black Lentils": { calories: 270, carbohydrates_g: 68, total_fat_g: 7, protein_g: 5 },
    "SuperGreens": { calories: 40, carbohydrates_g: 8, total_fat_g: 0.5, protein_g: 3 },
    "Arugula": { calories: 20, carbohydrates_g: 4, total_fat_g: 0.5, protein_g: 2 },
    "Baby Spinach": { calories: 20, carbohydrates_g: 3, total_fat_g: 0.5, protein_g: 3 },
    "Romaine": { calories: 20, carbohydrates_g: 4, total_fat_g: 0.5, protein_g: 2 },
    "SplendidGreens": { calories: 20, carbohydrates_g: 4, total_fat_g: 0.5, protein_g: 1 }
  },
  "Mains": {
    "Braised Lamb": { calories: 210, carbohydrates_g: 2, total_fat_g: 12, protein_g: 24 },
    "Grilled Chicken": { calories: 250, carbohydrates_g: 1, total_fat_g: 15, protein_g: 26 },
    "Falafel": { calories: 350, carbohydrates_g: 28, total_fat_g: 20, protein_g: 12 },
    "Grilled Steak": { calories: 170, carbohydrates_g: 0, total_fat_g: 8, protein_g: 25 },
    "Harissa Honey Chicken": { calories: 200, carbohydrates_g: 8, total_fat_g: 10, protein_g: 25 },
    "Roasted Vegetables": { calories: 100, carbohydrates_g: 15, total_fat_g: 4, protein_g: 3 },
    "Spicy Lamb Meatball": { calories: 300, carbohydrates_g: 3, total_fat_g: 22, protein_g: 24 },
    "Chicken Shawarma": { calories: 100, carbohydrates_g: 2, total_fat_g: 4, protein_g: 16 }
  },
  "Toppings": {
    "Shredded Romaine": { calories: 5, carbohydrates_g: 1, total_fat_g: 0, protein_g: 0 },
    "Pita Crisps": { calories: 70, carbohydrates_g: 11, total_fat_g: 2, protein_g: 2 },
    "Cabbage Slaw": { calories: 35, carbohydrates_g: 2, total_fat_g: 3, protein_g: 1 },
    "Tomato + Onion": { calories: 20, carbohydrates_g: 4, total_fat_g: 0, protein_g: 1 },
    "Persian Cucumber": { calories: 15, carbohydrates_g: 3, total_fat_g: 0, protein_g: 1 },
    "Tomato + Cucumber": { calories: 5, carbohydrates_g: 1, total_fat_g: 0, protein_g: 1 },
    "Kalamata Olives": { calories: 35, carbohydrates_g: 2, total_fat_g: 3, protein_g: 0 },
    "Fiery Broccoli": { calories: 35, carbohydrates_g: 4, total_fat_g: 2, protein_g: 2 },
    "Pickled Onions": { calories: 20, carbohydrates_g: 5, total_fat_g: 0, protein_g: 0 },
    "Salt-Brined Pickles": { calories: 5, carbohydrates_g: 1, total_fat_g: 0, protein_g: 0 },
    "Crumbled Feta": { calories: 35, carbohydrates_g: 1, total_fat_g: 3, protein_g: 2 },
    "Fire-Roasted Corn": { calories: 45, carbohydrates_g: 8, total_fat_g: 1, protein_g: 2 },
    "Avocado": { calories: 110, carbohydrates_g: 7, total_fat_g: 10, protein_g: 2 }
  },
  "Dips & Spreads": {
    "Tzatziki": { calories: 35, carbohydrates_g: 2, total_fat_g: 3, protein_g: 1 },
    "Hummus": { calories: 45, carbohydrates_g: 4, total_fat_g: 3, protein_g: 2 },
    "Roasted Eggplant": { calories: 50, carbohydrates_g: 3, total_fat_g: 4, protein_g: 1 },
    "Crazy Feta": { calories: 70, carbohydrates_g: 2, total_fat_g: 6, protein_g: 3 },
    "Harissa": { calories: 70, carbohydrates_g: 3, total_fat_g: 6, protein_g: 1 },
    "Red Pepper Hummus": { calories: 40, carbohydrates_g: 4, total_fat_g: 2, protein_g: 2 }
  },
  "Dressings": {
    "Balsamic Date Vinaigrette": { calories: 60, carbohydrates_g: 4, total_fat_g: 5, protein_g: 0 },
    "Yogurt Dill": { calories: 30, carbohydrates_g: 2, total_fat_g: 2, protein_g: 1 },
    "Lemon-Herb Tahini": { calories: 70, carbohydrates_g: 3, total_fat_g: 6, protein_g: 2 },
    "Tahini Caesar": { calories: 50, carbohydrates_g: 2, total_fat_g: 4, protein_g: 2 },
    "Greek Vinaigrette": { calories: 130, carbohydrates_g: 2, total_fat_g: 14, protein_g: 0 },
    "Skrug": { calories: 80, carbohydrates_g: 3, total_fat_g: 8, protein_g: 1 },
    "Hot Harissa Vinaigrette": { calories: 70, carbohydrates_g: 3, total_fat_g: 7, protein_g: 1 },
    "Garlic Dressing": { calories: 180, carbohydrates_g: 4, total_fat_g: 19, protein_g: 1 }
  }
};

export const categories: CategoryInfo[] = [
  {
    key: 'greens',
    name: 'Greens + Grains',
    displayName: 'Greens + Grains',
    icon: '🌱',
    color: 'text-green-400',
    description: 'Base ingredients'
  },
  {
    key: 'mains',
    name: 'Mains',
    displayName: 'Mains',
    icon: '🍖',
    color: 'text-orange-400',
    description: 'Protein sources'
  },
  {
    key: 'toppings',
    name: 'Toppings',
    displayName: 'Toppings',
    icon: '🌶️',
    color: 'text-blue-400',
    description: 'Fresh additions'
  },
  {
    key: 'dips',
    name: 'Dips & Spreads',
    displayName: 'Dips & Spreads',
    icon: '🥣',
    color: 'text-yellow-400',
    description: 'Creamy flavors'
  },
  {
    key: 'dressings',
    name: 'Dressings',
    displayName: 'Dressings',
    icon: '💧',
    color: 'text-purple-400',
    description: 'Flavor enhancers'
  }
];

export const getCategoryByKey = (key: string) => {
  return categories.find(cat => cat.key === key);
};

export const getIngredientsByCategory = (categoryName: string) => {
  return nutritionData[categoryName] || {};
};
