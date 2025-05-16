import { SearchResultItemProps } from './search-result-item'

export interface SearchResult {
  total_results: number
  total_pages: number
  results: SearchResultItemProps[]
}
