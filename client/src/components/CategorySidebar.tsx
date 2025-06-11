import { motion } from 'framer-motion';
import type { CategoryKey, CategoryInfo } from '@/types/nutrition';
import { categories } from '@/lib/nutritionData';

interface CategorySidebarProps {
  selectedCategory: CategoryKey;
  onCategoryChange: (category: CategoryKey) => void;
}

export default function CategorySidebar({ selectedCategory, onCategoryChange }: CategorySidebarProps) {
  const getIconComponent = (icon: string) => {
    const iconMap: { [key: string]: string } = {
      '🌱': 'fas fa-seedling',
      '🍖': 'fas fa-drumstick-bite',
      '🌶️': 'fas fa-pepper-hot',
      '🥣': 'fas fa-bowl-food',
      '💧': 'fas fa-tint'
    };
    return iconMap[icon] || 'fas fa-circle';
  };

  return (
    <motion.div
      className="space-y-4 slide-in"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-6 glow-text">Categories</h2>
      
      <div className="space-y-3">
        {categories.map((category, index) => (
          <motion.button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`w-full glass-panel p-4 rounded-2xl transition-all duration-300 group ${
              selectedCategory === category.key ? 'selected-category' : 'hover:bg-white/10'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center category-icon transition-all ${
                selectedCategory === category.key 
                  ? 'bg-blue-500/30 text-blue-300' 
                  : `${category.color.replace('text-', 'bg-')}/20 ${category.color}`
              }`}>
                <i className={`${getIconComponent(category.icon)} text-lg`} />
              </div>
              <div className="text-left">
                <div className="font-medium text-white group-hover:text-blue-200 transition-colors">
                  {category.displayName}
                </div>
                <div className="text-xs text-gray-400">
                  {category.description}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
