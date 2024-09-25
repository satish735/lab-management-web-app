import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.css'
const TextLoader = () => {
    return (
        <div >
            <Skeleton count={1} style={{width:'240px',height:'30px'}} />
        </div>
    );
};
export default TextLoader;