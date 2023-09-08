export interface ResponseWrapperT<ResponseT> {
  get: string
  parameters: [] | { [key: string]: string }
  errors: [] | { [key: string]: string }
  results: number
  paging: {
    current: number
    total: number
  }
  response: ResponseT
}
