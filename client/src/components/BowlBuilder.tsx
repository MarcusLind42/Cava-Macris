import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RotateCcw, Minus, Plus, X } from 'lucide-react';
import IngredientCard from './IngredientCard';
import type { Ingredient, CategoryKey, NutritionInfo } from '@/types/nutrition';
import { nutritionData, getCategoryByKey } from '@/lib/nutritionData';

interface BowlBuilderProps {
  selectedCategory: CategoryKey;
  selectedIngredients: Ingredient[];
  onIngredientsChange: (ingredients: Ingredient[]) => void;
}

export default function BowlBuilder({ selectedCategory, selectedIngredients, onIngredientsChange }: BowlBuilderProps) {
  const [animatingIngredient, setAnimatingIngredient] = useState<string | null>(null);

  const categoryInfo = getCategoryByKey(selectedCategory);
  const categoryData = nutritionData[categoryInfo?.name || ''] || {};

  const addIngredient = (name: string, nutrition: NutritionInfo, category: string) => {
    setAnimatingIngredient(name);
    
    const existingIndex = selectedIngredients.findIndex(ing => ing.name === name);
    
    if (existingIndex >= 0) {
      const updated = [...selectedIngredients];
      updated[existingIndex].quantity += 1;
      onIngredientsChange(updated);
    } else {
      const newIngredient: Ingredient = {
        name,
        category,
        nutrition,
        quantity: 1
      };
      onIngredientsChange([...selectedIngredients, newIngredient]);
    }

    setTimeout(() => setAnimatingIngredient(null), 300);
  };

  const updateQuantity = (name: string, delta: number) => {
    const updated = selectedIngredients.map(ingredient => {
      if (ingredient.name === name) {
        const newQuantity = Math.max(0, ingredient.quantity + delta);
        return { ...ingredient, quantity: newQuantity };
      }
      return ingredient;
    }).filter(ingredient => ingredient.quantity > 0);
    
    onIngredientsChange(updated);
  };

  const removeIngredient = (name: string) => {
    const updated = selectedIngredients.filter(ing => ing.name !== name);
    onIngredientsChange(updated);
  };

  const clearBowl = () => {
    onIngredientsChange([]);
  };

  return (
    <motion.div
      className="glass-panel p-6 rounded-3xl fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold glow-text">Build Your Bowl</h2>
        <div className="flex space-x-2">
          <motion.button
            className="glass-panel px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-all flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            <span>Save Bowl</span>
          </motion.button>
          <motion.button
            onClick={clearBowl}
            className="glass-panel px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-all flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        </div>
      </div>

      {/* Selected Ingredients Display */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Your Bowl</h3>
        <motion.div
          className="glass-panel p-4 rounded-2xl min-h-[120px] border-2 border-dashed border-white/20"
          layout
        >
          <AnimatePresence mode="wait">
            {selectedIngredients.length === 0 ? (
              <motion.div
                key="empty"
                className="text-center text-gray-400 py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-4xl mb-4 opacity-50">🥗</div>
                <p>Drag ingredients here to build your bowl</p>
              </motion.div>
            ) : (
              <motion.div
                key="filled"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AnimatePresence>
                  {selectedIngredients.map((ingredient) => (
                    <motion.div
                      key={ingredient.name}
                      className="glass-panel p-3 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      layout
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-white">{ingredient.name}</h4>
                        <button
                          onClick={() => removeIngredient(ingredient.name)}
                          className="text-red-400 hover:text-red-300 text-xs p-1 rounded hover:bg-red-500/20 transition-all"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-400 mb-2">
                        {ingredient.category} • {ingredient.nutrition.calories * ingredient.quantity} cal
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => updateQuantity(ingredient.name, -1)}
                            className="w-6 h-6 bg-white/10 rounded-full text-xs hover:bg-white/20 flex items-center justify-center transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus className="w-3 h-3" />
                          </motion.button>
                          <span className="font-medium w-6 text-center">{ingredient.quantity}</span>
                          <motion.button
                            onClick={() => updateQuantity(ingredient.name, 1)}
                            className="w-6 h-6 bg-white/10 rounded-full text-xs hover:bg-white/20 flex items-center justify-center transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Available Ingredients */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold glow-text flex items-center">
          <span className="mr-2">{categoryInfo?.icon}</span>
          Available {categoryInfo?.displayName}
        </h3>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          layout
        >
          <AnimatePresence>
            {Object.entries(categoryData).map(([name, nutrition], index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={animatingIngredient === name ? 'pulse-scale' : ''}
              >
                <IngredientCard
                  name={name}
                  nutrition={nutrition}
                  category={categoryInfo?.name || ''}
                  color={categoryInfo?.color || 'text-blue-400'}
                  onAdd={addIngredient}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
