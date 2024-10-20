import { consumidorMock } from '../../mocks/consumidor';
import Table from './components/table';

const Biblioteca: React.FC = () => {
  return (
    <div className='mt-8'>
      <Table data={[consumidorMock, consumidorMock, consumidorMock]} />
    </div>
  );
};

export default Biblioteca;
