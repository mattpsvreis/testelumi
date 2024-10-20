import Axios from '@configs/AxiosConfig';

import Fatura from '@models/fatura';

export const getFaturas = async (): Promise<Fatura[]> => {
  return await Axios.get<Fatura[]>('/faturas')
    .then((response) => {
      console.log('response.data:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const getFaturasById = async (id: number): Promise<Fatura[]> => {
  return await Axios.get<Fatura[]>(`/faturas/id/${id}`)
    .then((response) => {
      console.log('response.data:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const getFaturasByNumeroCliente = async (
  numeroCliente: string
): Promise<Fatura[]> => {
  return await Axios.get<Fatura[]>(`/faturas/numero_cliente/${numeroCliente}`)
    .then((response) => {
      console.log('response.data:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const postFatura = async (data: Fatura): Promise<Fatura | void> => {
  return await Axios.post<Fatura>('/faturas', data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.error(err));
};

export const patchFatura = async (
  id: number,
  data: Fatura
): Promise<Fatura | void> => {
  return await Axios.patch<Fatura>(`/faturas/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.error(err));
};

export const putFatura = async (
  id: number,
  data: Fatura
): Promise<Fatura | void> => {
  return await Axios.put<Fatura>(`/faturas/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.error(err));
};

export const uploadFaturaPDF = async (
  data: FormData
): Promise<Fatura | void> => {
  return await Axios.post('/faturas/upload-pdf', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      console.log('response.data:', response.data);
      return response.data;
    })
    .catch((err) => console.error(err));
};
