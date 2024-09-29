import { apiBase } from "../config";
import { ICard,CreateICard } from "../interfaces/CardInterfaces";
import { getToken } from "./UserService";

type FetchResult<T> = {
  error: string | null;
  result: T | undefined;
};

export const doGetAllCards = async (): Promise<FetchResult<ICard[]>> => {
  try {
    const response = await fetch(`${apiBase}/cards`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (!response.ok) return { error: data?.message || 'Failed to fetch cards', result: undefined };

    return { error: null, result: data.data };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: undefined };
  }
};

export const doGetMyCards = async (): Promise<FetchResult<ICard[]>> => {
  try {
    const token = await getToken();
    if (!token) return { error: 'No token found', result: undefined };

    const response = await fetch(`${apiBase}/cards/my-cards`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });

    const data = await response.json();
    if (!response.ok) return { error: data?.message || 'Failed to fetch your cards', result: undefined };

    return { error: null, result: data.data };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: undefined };
  }
};


export const doCreateCard = async (newCard: Partial<CreateICard>): Promise<FetchResult<ICard>> => {
  try {
    const token = await getToken();
    if (!token) return { error: 'No token found', result: undefined };

    const response = await fetch(`${apiBase}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(newCard),
    });

    const data = await response.json();
    if (!response.ok) return { error: data?.message || 'Failed to create card', result: undefined };

    return { error: null, result: data.data };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: undefined };
  }
};

export const doUpdateCard = async (cardId: string, updatedCard: Partial<ICard>): Promise<FetchResult<ICard>> => {
  try {
    const token = await getToken();
    if (!token) return { error: 'No token found', result: undefined };

    const response = await fetch(`${apiBase}/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(updatedCard),
    });

    const data = await response.json();
    if (!response.ok) return { error: data?.message || 'Failed to update card', result: undefined };

    return { error: null, result: data.data };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: undefined };
  }
};


export const doDeleteCard = async (cardId: string): Promise<FetchResult<null>> => {
  try {
    const token = await getToken();
    if (!token) return { error: 'No token found', result: undefined };

    const response = await fetch(`${apiBase}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data?.message || 'Failed to delete card', result: undefined };
    }

    return { error: null, result: null };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: undefined };
  }
};
