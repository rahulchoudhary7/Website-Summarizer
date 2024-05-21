'use client';
import React from 'react';
import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '../../utils/cn';

const words =
   " I'm a skilled software developer with experience in Java, JavaScript and expertise in frameworks like React, Node.js and SpringBoot. I'm a quick learner and collaborate closely with clients to create efficient, scalable and user-friendly solutions that solve real-world problems. Let's work together to bring your idea to life!";

export function TextGenerateEffectDemo() {
   return <TextGenerateEffect words={words} />;
}

export const TextGenerateEffect = ({ words, className }: { words: string; className?: string }) => {
   const [scope, animate] = useAnimate();
   let wordsArray = words.split(' ');
   useEffect(() => {
      animate(
         'span',
         {
            opacity: 1,
         },
         {
            duration: 2,
            delay: stagger(0.1),
         },
      );
   }, [scope.current]);

   const renderWords = () => {
      return (
         <motion.div ref={scope}>
            {wordsArray.map((word, idx) => {
               return (
                  <motion.span
                     key={word + idx}
                     className='dark:text-white text-black opacity-0 font-semibold'
                  >
                     {word}{' '}
                  </motion.span>
               );
            })}
         </motion.div>
      );
   };

   return (
      <div className={cn('font-bold', className)}>
         <div className='mt-4'>
            <div className=' dark:text-white text-black text-lg tracking-wide'>
               {renderWords()}
            </div>
         </div>
      </div>
   );
};
