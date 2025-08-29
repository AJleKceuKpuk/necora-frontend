import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement } from 'react';

const AnimatedOutlet = () => {
    const location = useLocation();
    const outlet = useOutlet();

    return (
        <AnimatePresence mode="wait">
            {outlet && cloneElement(
                <motion.div
                    className='main__center'
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .3 }}
                >
                    {outlet}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedOutlet;
