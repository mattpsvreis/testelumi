import {
  consumidorMockJoseMesaly,
  consumidorMockSelfway,
} from '@mocks/consumidor';

import Table from './components/table';

const Biblioteca: React.FC = () => {
  return (
    <div className='mt-8'>
      <Table data={[consumidorMockJoseMesaly, consumidorMockSelfway]} />
    </div>
  );
};

export default Biblioteca;
