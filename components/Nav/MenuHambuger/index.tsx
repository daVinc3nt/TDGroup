import { useState,useRef } from 'react'
import  MenuToggle  from './MenuToggle'
import { motion, useCycle } from 'framer-motion';

const MenuHambuger = ({ toggle, IconColor }: { toggle: any, IconColor: string}) => {
    const [isOpen, toggleOpen] = useCycle(true, false);
    const containerRef = useRef(null);
    return (
        <motion.nav
        initial={false}
        animate={isOpen ? 'closed' : 'open'}
        className={`w-full z-50 xl:hidden ${
            isOpen ? '' : 'pointer-events-none'
            }`}
        ref={containerRef}
        >
        <MenuToggle IconColor={IconColor} toggle1={toggleOpen} toggle2={toggle} />
        </motion.nav>
    )
}

export default MenuHambuger
