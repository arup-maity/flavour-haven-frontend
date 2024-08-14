import React from 'react'
import MenuCard from '@/components/theme/menu/MenuCard';
const Menu = () => {
   return (
      <div className='w-full'>
         <div style={{ backgroundImage: 'url("/banner.png")', }} className="aspect-[6/1] bg-cover bg-no-repeat"></div>
         <div className="theme-container !py-20">
            <MenuCard slug='starters' />
            <MenuCard slug='main-dishes' order={2} />
            <MenuCard slug='desserts' />
            <MenuCard slug='drinks' order={2} />
         </div>
      </div>
   )
}

export default Menu