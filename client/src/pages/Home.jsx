import { HeroHighlight } from '../components/ui/hero-highlight';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish';
import { useState } from 'react';

import ReactMarkdown from 'react-markdown';

import { MultiStepLoader as Loader } from '../components/ui/multi-step-loader';

export const Home = () => {
   const placeholders = [
      'Write here the website url',
      'eg: www.wikipedia.org',
      'eg: www.linkedin.com',
      'eg: www.cimba.ai',
      'eg: www.instagram.com',
      'eg: www.youtube.com',
   ];
   const [url, setUrl] = useState('');
   const [summary, setSummary] = useState('');
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   const loadingStates = [
      {
         text: 'Analyzing URL...',
      },
      {
         text: 'Extracting key points...',
      },
      {
         text: 'Summarizing content...',
      },
      {
         text: 'Gathering insights...',
      },
      {
         text: 'Compiling summary...',
      },
      {
         text: 'Almost done...',
      },
      {
         text: 'Just a moment...',
      },
      {
         text: 'Summary ready!',
      },
   ];

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (url.includes(' ')) {
         setError('URL can not contain spaces');
         return;
      }
      try {
         setError(null);
         setLoading(true);
         console.log(url);
         const response = await fetch('http://localhost:3030/api/summarize', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
         });

         if (!response.ok) {
            setError('Network response was not ok');
            setLoading(false);
            return;
         }

            setLoading(false);
            const data = await response.text();
            setSummary(data);
         } catch (error) {
            setError(error.message);
            setLoading(false);
            console.log(error);
         }
   };

   const handleChange = (e) => {
      setUrl(e.target.value);
   };

   return (
      <div className='bg-black min-h-screen relative'>
         <HeroHighlight>
            <div className='flex flex-col mx-auto'>

               <div className='h-full flex flex-col gap-10 justify-center mt-20 px-4'>
                  <h2 className=' text-xl text-center sm:text-5xl dark:text-white text-black font-bold'>
                     Get your website summary here
                  </h2>
                  <PlaceholdersAndVanishInput
                     placeholders={placeholders}
                     onChange={handleChange}
                     onSubmit={handleSubmit}
                  />
               </div>
               <button className='flex justify-center text-center mt-5' disabled={!url}>
                  <HoverBorderGradient
                     containerClassName='rounded-full'
                     as='button'
                     className='dark:bg-black bg-white text-black dark:text-white flex items-center'
                     onClick={handleSubmit}
                  >
                     <span>Get Summary</span>
                  </HoverBorderGradient>
               </button>

               {loading && (
                  <div className='w-full h-[60vh] flex items-center justify-center'>
                     <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
                  </div>
               )}
               {!error && summary && (
                  <div className=' w-[90%] md:w-[60%] mx-auto text-white p-5 my-5 bg-white/10 shadow-sm shadow-slate-200'>
                     {/* <TextGenerateEffect words={summary} /> */}
                     <ReactMarkdown >
                        {summary.replace(/\\n/g, '\n').replace(/"/g, '')}
                     </ReactMarkdown>
                  </div>
               )}

               {error && (
                  <p className='text-red-400 w-[50%] rounded-full text-center mx-auto text-lg font-medium'>
                     {error}
                  </p>
               )}
            </div>
         </HeroHighlight>
      </div>
   );
};
