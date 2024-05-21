import { Link } from 'react-router-dom';
import { HoverBorderGradient } from './ui/hover-border-gradient';

export const Header = () => {
  
   return (
      <div className='sticky top-0 left-0 right-0 z-100 flex justify-between items-center w-full bg-black'>
         <div className=''>
            <Link to={'/'}>
               <img
                  src={
                     'https://assets-global.website-files.com/6554169c8030cc926369c104/65a41544d48aca58832f8952_Group%201171274766.svg'
                  }
                  className='h-10 p-2'
               />
            </Link>
         </div>

         <div className='text-gray-100 flex items-center gap-4 mr-10'>
            <Link to={'/history'} className='m-2'>
               <HoverBorderGradient
                  containerClassName='rounded-full'
                  as='button'
                  className='dark:bg-black bg-white text-black dark:text-white flex items-center'
               >
                  <span>View History</span>
               </HoverBorderGradient>
            </Link>
         </div>
      </div>
   );
};
