import { FunnelIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
function GraphFilter({ setGraphType }) {
  return (
    <Menu as="div" className="relative inline-block text-left">  
        <MenuButton className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
        <FunnelIcon className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Visualização</span>
        </MenuButton>
        <MenuItems className="absolute top-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 focus:outline-none">
        <div className="p-1">
            <MenuItem>
            {({ focus }) => (
                <button
                onClick={() => setGraphType('bar')}
                className={`${
                    focus ? 'bg-emerald-50 text-emerald-600' : 'text-gray-900'
                } cursor-pointer group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                > 📊 Gráfico de Barras
                </button>
            )}
            </MenuItem>
            <MenuItem>
            {({ focus }) => (
                <button
                onClick={() => setGraphType('pie')}
                className={`${
                    focus ? 'bg-emerald-50 text-emerald-600' : 'text-gray-900'
                } cursor-pointer group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                > 🍰 Gráfico de Pizza
                </button>
            )}
            </MenuItem>
            <MenuItem>
            {({ focus }) => (
                <button
                onClick={() => setGraphType('line')}
                className={`${
                    focus ? 'bg-emerald-50 text-emerald-600' : 'text-gray-900'
                } cursor-pointer group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                > 📈 Gráfico de Linha
                </button>
            )}
            </MenuItem>
        </div>
        </MenuItems>
    </Menu>
  );
}

export default GraphFilter;