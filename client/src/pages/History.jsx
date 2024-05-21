import { useEffect, useState } from 'react';
import { HeroHighlight } from '../components/ui/hero-highlight';
import ReactMarkdown from 'react-markdown';

export const History = () => {
   const [history, setHistory] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchHistory = async () => {
         setError(null);
         setLoading(true);
         try {
            const response = await fetch('http://localhost:3030/api/getHistory');

            if (response.ok) {
               setLoading(false);
               setError(null);
               const data = await response.json();
               setHistory(data);
            }
         } catch (err) {
            setError(err.message);
            setLoading(false);
         }
      };

      fetchHistory();
   }, []);

   const deleteHistory = async (id) => {
      try {
         setError(null);
         setLoading(true);
         await fetch(`http://localhost:3030/api/deleteHistory/${id}`, {
            method: 'DELETE',
         });
         setHistory(history.filter((item) => item.id !== id));
         setLoading(false);
      } catch (err) {
         setError(err.message);
         setLoading(false);
      }
   };

   return (
      <HeroHighlight>
         <div className='flex items-center justify-center min-h-screen'>
            {history && (
               <ul>
                  {history.map((item) => (
                     <li key={item.id} className='text-white'>
                        <div className=' w-[90%] md:w-[60%] mx-auto text-white p-5 my-5 bg-white/10 shadow-sm shadow-slate-200'>
                           <div className='flex justify-between items-center'>
                              <p className='text-gray-300 text-lg font-bold'>URL : {item.url}</p>{' '}
                              <button
                                 onClick={() => deleteHistory(item.id)}
                                 className='bg-red-500 rounded-full w-20'
                              >
                                 Delete
                              </button>
                           </div>
                           <br />
                           <strong>Summary :</strong>
                           <br />
                           <ReactMarkdown>
                              {item.urlSummary.replace(/\\n/g, '\n').replace(/"/g, '')}
                           </ReactMarkdown>
                        </div>
                     </li>
                  ))}
               </ul>
            )}
            {!history && <span className='text-white text-xl'>No Histories Found</span>}
            {loading && <span className='text-white text-xl'>Loading history...</span>}
            {error && (
               <p className='text-red-400 w-[50%] rounded-full text-center mx-auto text-lg font-medium'>
                  {error}
               </p>
            )}
         </div>
      </HeroHighlight>
   );
};
