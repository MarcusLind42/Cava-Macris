export interface NutritionInfo {
  calories: number;
  carbohydrates_g: number;
  total_fat_g: number;
  protein_g: number;
}

export interface Ingredient {
  name: string;
  category: string;
  nutrition: NutritionInfo;
  quantity: number;
  portionSize?: 'full' | 'half';
}

export interface CategoryData {
  [ingredientName: string]: NutritionInfo;
}

export interface NutritionData {
  [categoryName: string]: CategoryData;
}

export interface TotalNutrition {
  calories: number;
  protein_g: number;
  carbohydrates_g: number;
  total_fat_g: number;
}

export type CategoryKey = 'greens' | 'mains' | 'toppings' | 'dips' | 'dressings';

export interface CategoryInfo {
  key: CategoryKey;
  name: string;
  displayName: string;
  icon: string;
  color: string;
  description: string;
}
