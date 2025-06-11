import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Info } from 'lucide-react';
import type { NutritionInfo } from '@/types/nutrition';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface IngredientCardProps {
  name: string;
  nutrition: NutritionInfo;
  category: string;
  color: string;
  onAdd: (name: string, nutrition: NutritionInfo, category: string, portionSize?: 'full' | 'half') => void;
}

export default function IngredientCard({ name, nutrition, category, color, onAdd }: IngredientCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPortion, setSelectedPortion] = useState<'full' | 'half'>('full');

  const isPortionSelectable = category === 'Greens + Grains' || category === 'Mains';

  const handleAdd = (portionSize: 'full' | 'half' = 'full') => {
    onAdd(name, nutrition, category, portionSize);
  };

  const colorClasses = {
    'text-green-400': 'bg-green-400/20 border-green-400/30 text-green-400',
    'text-orange-400': 'bg-orange-400/20 border-orange-400/30 text-orange-400',
    'text-blue-400': 'bg-blue-400/20 border-blue-400/30 text-blue-400',
    'text-yellow-400': 'bg-yellow-400/20 border-yellow-400/30 text-yellow-400',
    'text-purple-400': 'bg-purple-400/20 border-purple-400/30 text-purple-400',
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses['text-blue-400'];

  return (
    <TooltipProvider>
      <motion.div
        className="ingredient-card glass-panel p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <h4 className="font-medium text-xs md:text-sm text-white group-hover:text-blue-200 transition-colors truncate pr-2">
            {name}
          </h4>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </TooltipTrigger>
              <TooltipContent side="top" className="glass-panel border-white/20">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Calories:</span>
                    <span className="text-white font-medium">
                      {selectedPortion === 'half' ? Math.round(nutrition.calories / 2) : nutrition.calories}
                    </span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Protein:</span>
                    <span className="text-white font-medium">
                      {selectedPortion === 'half' ? (nutrition.protein_g / 2).toFixed(1) : nutrition.protein_g}g
                    </span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Carbs:</span>
                    <span className="text-white font-medium">
                      {selectedPortion === 'half' ? (nutrition.carbohydrates_g / 2).toFixed(1) : nutrition.carbohydrates_g}g
                    </span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Fat:</span>
                    <span className="text-white font-medium">
                      {selectedPortion === 'half' ? (nutrition.total_fat_g / 2).toFixed(1) : nutrition.total_fat_g}g
                    </span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <div className="space-y-1 text-xs text-gray-400 mb-2 md:mb-3">
          <div className="flex justify-between">
            <span>Calories</span>
            <span className="text-white font-medium">
              {selectedPortion === 'half' ? Math.round(nutrition.calories / 2) : nutrition.calories}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Protein</span>
            <span className="text-white font-medium">
              {selectedPortion === 'half' ? (nutrition.protein_g / 2).toFixed(1) : nutrition.protein_g}g
            </span>
          </div>
        </div>

        {/* Portion Size Selection */}
        {isPortionSelectable && (
          <div className="mb-2 md:mb-3">
            <div className="flex rounded-lg overflow-hidden bg-white/10">
              <motion.button
                onClick={() => setSelectedPortion('full')}
                className={`flex-1 py-1 text-xs font-medium transition-all ${
                  selectedPortion === 'full' 
                    ? 'bg-blue-500/50 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                Full
              </motion.button>
              <motion.button
                onClick={() => setSelectedPortion('half')}
                className={`flex-1 py-1 text-xs font-medium transition-all ${
                  selectedPortion === 'half' 
                    ? 'bg-blue-500/50 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                Half
              </motion.button>
            </div>
          </div>
        )}
        
        <motion.button
          onClick={() => handleAdd(isPortionSelectable ? selectedPortion : 'full')}
          className={`w-full mt-2 md:mt-3 py-2 md:py-2 rounded-lg text-xs font-medium transition-all duration-300 ${colorClass} hover:scale-105 active:scale-95 touch-manipulation`}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="inline w-3 h-3 mr-1 md:mr-2" />
          <span className="text-xs md:text-xs">
            Add {isPortionSelectable ? `${selectedPortion === 'half' ? 'Half' : 'Full'} ` : ''}to Bowl
          </span>
        </motion.button>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-white/10"
            >
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-gray-400">Carbs</div>
                  <div className="text-white font-medium">
                    {selectedPortion === 'half' ? (nutrition.carbohydrates_g / 2).toFixed(1) : nutrition.carbohydrates_g}g
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">Fat</div>
                  <div className="text-white font-medium">
                    {selectedPortion === 'half' ? (nutrition.total_fat_g / 2).toFixed(1) : nutrition.total_fat_g}g
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </TooltipProvider>
  );
}
