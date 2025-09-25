import { PortfolioData } from '@/components/home/portfolios';
import { useEffect, useState } from 'react';

const useCarouselContentsAdjuster = (initialData: PortfolioData[], initialCount: number) => {
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(initialCount);

    const carouselCtrl = (btnId: string) => {
        console.log(btnId);
        setData((prevState) => {
          if (prevState.length === 0) return prevState; // Return unchanged state if empty
      
          if (btnId === 'leftCarouselBtn') {
            // Move the last project to the start
            const lastProject = prevState[prevState.length - 1];
            const restProjects = prevState.slice(0, -1);
            return [lastProject, ...restProjects];
          } else if (btnId === 'rightCarouselBtn') {
            // Move the first project to the end
            const firstProject = prevState[0];
            const restProjects = prevState.slice(1);
            return [...restProjects, firstProject];
          }
      
          return prevState; // Fallback in case of no matching id
        });
      };  
    
      useEffect(() => {
        const updateCount = () => {
          const width = window.innerWidth;
    
          if (width <= 590) setCount(1);
          else if (width <=768) setCount(2);
          else if (width <=1024) setCount(3);
          else setCount(4);
        };
    
        updateCount();
        window.addEventListener("resize", updateCount);
        return () => window.removeEventListener("resize", updateCount);
      }, []);
      
      return { data, count, carouselCtrl };
}

export default useCarouselContentsAdjuster;


// import React from 'react';
// import useCarouselContentsAdjuster from './useCarouselContentsAdjuster';

// const CarouselComponent = () => {
//     const initialData = ['Project 1', 'Project 2', 'Project 3'];
//     const initialCount = 3;
//     const { data, count, carouselCtrl } = useCarouselContentsAdjuster(initialData, initialCount, 'rightCarouselBtn');

//     return (
//         <div>
//             <button id="leftCarouselBtn" onClick={() => carouselCtrl('leftCarouselBtn')}>Left</button>
//             <button id="rightCarouselBtn" onClick={() => carouselCtrl('rightCarouselBtn')}>Right</button>
//             <div>
//                 {data.slice(0, count).map((item, index) => (
//                     <div key={index}>{item}</div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CarouselComponent;