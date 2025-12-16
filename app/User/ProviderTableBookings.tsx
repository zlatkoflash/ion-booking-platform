import { GetBookingsFromDB } from '@/utils/bokunAdminClient';
import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthProvider';

// --- 1. DEFINE TYPES (Internal to this file) ---

// Define the shape of the data rows
export interface BookingRowDB {
  total_rows: number;
  booking_id: string;
  booking_status: string;
  booking_currency: string;
  booking_financial_status: string;
  booking_created_at: string;
  tour_title: string;
  tour_price: number;
  user_name: string | null;
  user_email: string | null;
  payment_intent_id: string | null;
  payment_amount_cents: number | null;
  payment_status: string | null;
  total_refunded_cents: number;
}

// Define the pagination state
export interface PaginationState {
  page: number; // Current page number (1-based)
  countPerPage: number;
}

// Define the arguments that the external fetcher will use
export interface FBookingsListArgs {
  p_user_id: string | null;
  p_tour_id: string | null;
  p_user_email: string | null;
  p_user_name: string | null;
  p_from_date: string | null;
  p_to_date: string | null;
  p_limit: number;
  p_offset: number;
}

// Define the shape of the context values (what consumers will use)
export interface TableBookingsContextType {
  // Data (Injected via Props)
  rows: BookingRowDB[];
  setRows: (rows: BookingRowDB[]) => void
  totalCount: number;
  // isLoading: boolean;
  // error: string | null;

  // Filters and Pagination State (Managed Internally)
  searchText: string;
  // pagination: PaginationState;
  pageIndex: number;
  offset: number;
  maxPages: number;

  NavigateNext: () => void;
  NavigatePrev: () => void;

  // NEW: Pagination Metadata for easy consumption
  pageNumber: number; // Current page number (alias for pagination.page)
  // maxPages: number;   // Calculated maximum number of pages

  // Arguments needed by the external fetcher (read-only snapshot of current state)
  fetcherArgs: FBookingsListArgs;

  // Actions / Dispatchers
  setSearchText: (text: string) => void;
  setPage: (page: number) => void;
  setCountPerPage: (count: number) => void;
  refreshData: () => void; // A symbolic function to trigger external re-fetch
}




// --- 2. CREATE CONTEXT & CUSTOM HOOK ---

const TableBookingsContext = createContext<TableBookingsContextType | undefined>(undefined);

export const useTableBookings = () => {
  const context = useContext(TableBookingsContext);
  if (!context) {
    throw new Error('useTableBookings must be used within a TableBookingsProvider');
  }
  return context;
};

// --- 3. PROVIDER PROPS (DATA INJECTION) ---

/*interface TableBookingsProviderProps {
  children: React.ReactNode;
  rows?: BookingRowDB[];
  totalCount?: number;
  isLoading?: boolean;
  error?: string | null;
  externalFilters?: Partial<Omit<FBookingsListArgs, 'p_limit' | 'p_offset' | 'p_user_email' | 'p_user_name'>>;
}*/

// --- 4. THE PROVIDER COMPONENT ---

// export const TableBookingsProvider: React.FC<TableBookingsProviderProps> = (props) => {
export const TableBookingsProvider = ({ children, bookings_owner = "all" }: { children: React.ReactNode, bookings_owner?: "all" | "logged-client" }) => {


  const {
    user
  } = useAuth();

  // State for user-driven filters and pagination
  const [searchText, setSearchText] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  // const [pagination, setPagination] = useState<PaginationState>({ page: 1, countPerPage: 10 });
  const maxCountPerPage = 10;
  const [pageIndex, setPageIndex] = useState(1);


  const [rows, setRows] = useState<BookingRowDB[]>([]);
  const [maxPages, setMaxPages] = useState(1);


  const NavigateNext = () => {
    if (pageIndex < maxPages) {
      setPage(pageIndex + 1);
    }
  }

  const NavigatePrev = () => {
    if (pageIndex > 1) {
      setPage(pageIndex - 1);
    }
  }
  // Calculated offset
  const offset = (pageIndex - 1) * maxCountPerPage;

  // Action handlers
  const setPage = useCallback((page: number) => {
    // Simple bounds check to prevent setting negative pages or pages far exceeding the max
    const newPage = Math.max(1, page);
    setPageIndex(newPage);
  }, []);

  const setCountPerPage = useCallback((count: number) => {
    setPageIndex(1);
  }, []);

  // A symbolic function to trigger re-fetch in the external layer
  const refreshData = useCallback(() => {
    setPageIndex(prev => prev);
  }, []);

  // Calculate new metadata fields
  /*const maxPages = useMemo(() => {
    if (totalCount === 0 || maxCountPerPage === 0) return 1;
    // Use Math.ceil to round up to the next whole page
    return Math.ceil(totalCount / maxCountPerPage);
  }, [totalCount, maxCountPerPage]);*/

  const pageNumber = pageIndex; // Alias for consumption

  // Construct the fetcher arguments for the external layer
  const fetcherArgs = useMemo<FBookingsListArgs>(() => ({
    p_limit: maxCountPerPage,
    p_offset: offset,
    p_user_email: searchText || null,
    p_user_name: searchText || null,

    // Merge in external constraints
    p_user_id: null,
    p_tour_id: null,
    p_from_date: null,
    p_to_date: null,
  }), [maxCountPerPage, offset, searchText]);

  // Memoize the context value
  const contextValue = useMemo<TableBookingsContextType>(() => ({
    // Data injected from props
    rows,
    setRows,
    totalCount,
    // isLoading,
    // error,
    maxPages,

    NavigateNext,
    NavigatePrev,

    // State managed internally
    searchText,
    pageIndex,
    offset,

    // NEW Metadata
    pageNumber,
    // maxPages,

    // Arguments exposed for the external fetcher
    fetcherArgs,

    // Actions
    setSearchText,
    setPage,
    setCountPerPage,
    refreshData,
  }), [
    rows, totalCount,
    // isLoading, error,
    searchText, pageIndex, offset,
    pageNumber,
    // maxPages, // Include new derived values
    fetcherArgs,
    setSearchText, setPage, setCountPerPage,
    refreshData
  ]);

  const fetchTheBookings = async () => {
    const bookings = await GetBookingsFromDB({
      p_limit: maxCountPerPage,
      p_offset: offset,
      p_user_email: null,
      p_user_name: null,

      // Merge in external constraints
      p_user_id: bookings_owner === "logged-client" ? user?.id.toString() as string : null,
      p_tour_id: null,
      p_from_date: null,
      p_to_date: null,

      p_global_search: searchText || null,
    });

    if (bookings.data !== undefined && bookings.data !== null) {
      setRows(bookings.data.bookings);
      if (bookings.data.bookings.length > 0) {
        setTotalCount(bookings.data.bookings[0].total_rows);
        setMaxPages(Math.ceil(bookings.data.bookings[0].total_rows / maxCountPerPage));
      }
    }

    console.log("bookings:", bookings);

  }

  useEffect(() => {
    fetchTheBookings();
  }, [
    searchText, pageNumber, pageIndex
  ]);
  useEffect(() => {
    setPageIndex(1);
  }, [searchText])

  return (
    <TableBookingsContext.Provider value={contextValue} >
      {children}
    </TableBookingsContext.Provider>
  );
};