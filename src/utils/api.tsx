type FetchApiParams = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  headers?: Record<string, string>;
};

export async function fetchApi({
  url,
  method = 'GET',
  data = null,
  headers = {},
}: FetchApiParams) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error', error.message);
      throw error;
    }
  }
}

export const handleSignout = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signoutSuccess: () => any
): Promise<void> => {
  try {
    const res = await fetch('/user/signout', {
      method: 'POST',
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data.message);
    } else {
      dispatch(signoutSuccess());
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error', error.message);
      throw error;
    }
  }
};
