import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function DataFilter({ setDataScope, currentScope }) {  
  return (
    <Menu as="div" className="relative inline-block text-left ml-2">
      <MenuButton className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
        <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
        <span className="text-xs font-medium text-gray-700 hidden sm:block">
          {currentScope === 'mensal' && 'Mensal'}
          {currentScope === 'semanal' && 'Semanal'}
          {currentScope === 'categoria' && 'Categorias'}
        </span>
      </MenuButton>

      <MenuItems className="absolute top-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 focus:outline-none cursor-pointer">
        <div className="p-1">
          <MenuItem>
            {({ focus }) => (
              <button onClick={() => setDataScope('mensal')} className={`${
                    focus ? 'bg-emerald-50 text-emerald-600' : 'text-gray-900'
                } cursor-pointer group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                📅 Mensal
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button onClick={() => setDataScope('semanal')} className={`${
                    focus ? 'bg-emerald-50 text-emerald-600' : 'text-gray-900'
                } cursor-pointer group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                📆 Semanal
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button onClick={() => setDataScope('categoria')} className={`${
                    focus ? 'bg-emerald-50 text-emerald-600' : 'text-gray-900'
                } cursor-pointer group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                🏷️ Por Categoria
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}