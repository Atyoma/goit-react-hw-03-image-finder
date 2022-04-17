import s from './loader.module.css';
import { Watch } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={s.loader}>
      <Watch height="150" width="150" color="tomato" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
