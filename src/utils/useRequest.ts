// https://github.com/vercel/swr/blob/main/examples/axios-typescript/libs/useRequest.ts
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { api } from '@/lib/axios'

export type GetRequest = AxiosRequestConfig | null

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate'
  > {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pagination: any
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { fallbackData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request,
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => api.request<Data>(request!),
    {
      ...config,
      revalidateOnFocus: false,
      fallbackData:
        fallbackData &&
        ({
          status: 200,
          statusText: 'InitialData',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          config: request!,
          headers: {},
          data: fallbackData,
        } as AxiosResponse<Data>),
    },
  )

  const responseData =
    response && response.data && (Object.values(response.data)[0] as Data)

  const pagination = { ...response?.data }

  return {
    data:
      typeof responseData === 'number'
        ? response && response.data
        : responseData,
    response,
    error,
    isValidating,
    mutate,
    pagination,
  }
}
