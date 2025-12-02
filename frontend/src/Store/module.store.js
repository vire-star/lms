import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useModuleStore = create(
  devtools(
    (set) => ({
      module: null,
      
      setModule: (moduleData) => set({ module: moduleData }), // ✅ Fixed: module not user
      
      clearModule: () => set({ module: null }),
    }),
    {
      name: 'ModuleStore',
    }
  )
);
