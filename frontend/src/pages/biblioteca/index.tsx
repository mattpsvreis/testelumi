import { consumidorMock2024 } from '../../mocks/consumidor';
import Table from './components/table';

const Biblioteca: React.FC = () => {
  return (
    <div className='mt-8'>
      <Table
        data={[consumidorMock2024, consumidorMock2024, consumidorMock2024]}
      />
    </div>
  );
};

export default Biblioteca;
