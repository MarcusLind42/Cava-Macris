import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import CategorySidebar from '@/components/CategorySidebar';
import BowlBuilder from '@/components/BowlBuilder';
import NutritionDashboard from '@/components/NutritionDashboard';
import type { CategoryKey, Ingredient } from '@/types/nutrition';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('greens');
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Header */}
      <motion.header
        className="relative z-50 glass-panel border-b border-white/10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className="text-white text-xl" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold glow-text">Cava Calculator</h1>
              <p className="text-sm text-gray-400">Mediterranean Macro Tracker</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 xl:col-span-3">
            <BowlBuilder
              selectedCategory={selectedCategory}
              selectedIngredients={selectedIngredients}
              onIngredientsChange={setSelectedIngredients}
            />
          </div>

          {/* Nutrition Dashboard */}
          <div className="lg:col-span-1">
            <NutritionDashboard
              selectedIngredients={selectedIngredients}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
