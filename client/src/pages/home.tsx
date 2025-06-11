import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Coffee, ExternalLink } from 'lucide-react';
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
        <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Leaf className="text-white text-lg md:text-xl" />
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold glow-text">Cava Calculator</h1>
                <p className="text-xs md:text-sm text-gray-400">Nutritional and Macro Tool</p>
              </div>
            </div>
            
            {/* Buy Me a Coffee Section */}
            <div className="hidden md:flex items-center space-x-3">
              <p className="text-xs text-gray-300">
                Please "Buy me a Coffee" if you feel this site provided value to you.
              </p>
              <motion.a
                href="https://buymeacoffee.com/mlindblo"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel px-3 py-2 rounded-full text-xs hover:bg-white/10 transition-all flex items-center space-x-2 text-yellow-400 hover:text-yellow-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Coffee className="w-4 h-4" />
                <span>Buy me a Coffee</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>

            {/* Mobile Buy Me a Coffee */}
            <motion.a
              href="https://buymeacoffee.com/mlindblo"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden glass-panel px-2 py-2 rounded-full hover:bg-white/10 transition-all text-yellow-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Coffee className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-4 md:px-6 md:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {/* Mobile Category Navigation */}
          <div className="lg:col-span-1 order-1 lg:order-none">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 xl:col-span-3 order-3 lg:order-none">
            <BowlBuilder
              selectedCategory={selectedCategory}
              selectedIngredients={selectedIngredients}
              onIngredientsChange={setSelectedIngredients}
            />
          </div>

          {/* Nutrition Dashboard */}
          <div className="lg:col-span-1 order-2 lg:order-none">
            <NutritionDashboard
              selectedIngredients={selectedIngredients}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-12 border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
          <div className="glass-panel p-4 md:p-6 rounded-2xl md:rounded-3xl">
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                This site is not associated with or endorsed by Cava Group, Inc or any related entities.
              </p>
              
              {/* Mobile Buy Me a Coffee Text */}
              <div className="md:hidden mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-300 mb-3">
                  Please "Buy me a Coffee" if you feel this site provided value to you.
                </p>
                <motion.a
                  href="https://buymeacoffee.com/mlindblo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 glass-panel px-4 py-2 rounded-full text-xs hover:bg-white/10 transition-all text-yellow-400 hover:text-yellow-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Coffee className="w-4 h-4" />
                  <span>Buy me a Coffee</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
