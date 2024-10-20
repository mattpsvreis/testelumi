import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className='mt-8 flex w-full flex-col items-center gap-2'>
      <h1 className='text-2xl font-semibold text-light-text dark:text-dark-text'>
        404 - Não Encontrada :(
      </h1>
      <p className='text-light-text dark:text-dark-text'>
        A página que você está procurando não existe.
      </p>
      <Link to='/dashboard' className='text-light-primary underline'>
        Voltar à página inicial
      </Link>
    </div>
  );
};

export default NotFound;
