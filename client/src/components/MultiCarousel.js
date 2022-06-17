import Carousel from 'react-elastic-carousel';
import CourseCard from './CourseCard';

function MultiCarousel({items}){
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
      ];
      
    return (
        <Carousel breakPoints={breakPoints}>
            {items.map((item, index) => <CourseCard key={index} item={item} />)}
        </Carousel>
    );
}
export default MultiCarousel;