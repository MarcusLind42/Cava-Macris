import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Share2, TrendingUp } from 'lucide-react';
import type { Ingredient, TotalNutrition } from '@/types/nutrition';

interface NutritionDashboardProps {
  selectedIngredients: Ingredient[];
}

export default function NutritionDashboard({ selectedIngredients }: NutritionDashboardProps) {
  const [totalNutrition, setTotalNutrition] = useState<TotalNutrition>({
    calories: 0,
    protein_g: 0,
    carbohydrates_g: 0,
    total_fat_g: 0
  });

  const [animatedValues, setAnimatedValues] = useState<TotalNutrition>({
    calories: 0,
    protein_g: 0,
    carbohydrates_g: 0,
    total_fat_g: 0
  });

  // Calculate nutrition totals
  useEffect(() => {
    const newTotals = selectedIngredients.reduce((total, ingredient) => {
      const { nutrition, quantity } = ingredient;
      return {
        calories: total.calories + (nutrition.calories * quantity),
        protein_g: total.protein_g + (nutrition.protein_g * quantity),
        carbohydrates_g: total.carbohydrates_g + (nutrition.carbohydrates_g * quantity),
        total_fat_g: total.total_fat_g + (nutrition.total_fat_g * quantity)
      };
    }, { calories: 0, protein_g: 0, carbohydrates_g: 0, total_fat_g: 0 });

    setTotalNutrition(newTotals);
  }, [selectedIngredients]);

  // Animate values
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedValues({
        calories: Math.round(totalNutrition.calories * easedProgress),
        protein_g: Math.round(totalNutrition.protein_g * easedProgress * 10) / 10,
        carbohydrates_g: Math.round(totalNutrition.carbohydrates_g * easedProgress * 10) / 10,
        total_fat_g: Math.round(totalNutrition.total_fat_g * easedProgress * 10) / 10
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues(totalNutrition);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [totalNutrition]);

  // Daily targets for progress calculation
  const dailyTargets = {
    calories: 2000,
    protein_g: 150,
    carbohydrates_g: 250,
    total_fat_g: 65
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const ProgressBar = ({ value, max, color, label }: { value: number; max: number; color: string; label: string }) => {
    const percentage = getProgressPercentage(value, max);
    
    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${color}`}>{label}</span>
          <span className="text-sm font-bold text-white">{Math.round(value * 10) / 10}g</span>
        </div>
        <div className="relative">
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs font-medium text-white/80">
              {Math.round(percentage)}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Macro Rings */}
      <motion.div
        className="glass-panel p-6 rounded-3xl fade-in"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-6 glow-text text-center">Macro Breakdown</h3>
        
        {/* Total Calories */}
        <div className="text-center mb-8">
          <motion.div
            key={animatedValues.calories}
            className="text-5xl font-bold glow-text text-blue-400"
            initial={{ scale: 1.2, color: '#60A5FA' }}
            animate={{ scale: 1, color: '#FFFFFF' }}
            transition={{ duration: 0.3 }}
          >
            {animatedValues.calories}
          </motion.div>
          <div className="text-sm text-gray-400">Total Calories</div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round((animatedValues.calories / dailyTargets.calories) * 100)}% of daily goal
          </div>
        </div>

        {/* Macro Progress Bars */}
        <div className="space-y-6">
          <ProgressBar
            value={animatedValues.protein_g}
            max={dailyTargets.protein_g}
            color="text-orange-400"
            label="Protein"
          />
          
          <ProgressBar
            value={animatedValues.carbohydrates_g}
            max={dailyTargets.carbohydrates_g}
            color="text-blue-400"
            label="Carbohydrates"
          />
          
          <ProgressBar
            value={animatedValues.total_fat_g}
            max={dailyTargets.total_fat_g}
            color="text-green-400"
            label="Fat"
          />
        </div>
      </motion.div>

      {/* Detailed Nutrition */}
      <motion.div
        className="glass-panel p-6 rounded-3xl fade-in"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-lg font-bold mb-4 glow-text">Nutrition Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Calories</span>
            <motion.span
              key={animatedValues.calories}
              className="font-semibold text-white"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {animatedValues.calories}
            </motion.span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Protein</span>
            <motion.span
              key={animatedValues.protein_g}
              className="font-semibold text-orange-400"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {animatedValues.protein_g}g
            </motion.span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Carbohydrates</span>
            <motion.span
              key={animatedValues.carbohydrates_g}
              className="font-semibold text-blue-400"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {animatedValues.carbohydrates_g}g
            </motion.span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Fat</span>
            <motion.span
              key={animatedValues.total_fat_g}
              className="font-semibold text-green-400"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {animatedValues.total_fat_g}g
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="glass-panel p-6 rounded-3xl fade-in"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-bold mb-4 glow-text">Quick Actions</h3>
        <div className="space-y-3">
          <motion.button
            className="w-full glass-panel p-3 rounded-xl hover:bg-white/10 transition-all text-left flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save className="w-4 h-4 text-blue-400" />
            <span>Save to Favorites</span>
          </motion.button>
          <motion.button
            className="w-full glass-panel p-3 rounded-xl hover:bg-white/10 transition-all text-left flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 className="w-4 h-4 text-green-400" />
            <span>Share Bowl</span>
          </motion.button>
          <motion.button
            className="w-full glass-panel p-3 rounded-xl hover:bg-white/10 transition-all text-left flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span>View Trends</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
