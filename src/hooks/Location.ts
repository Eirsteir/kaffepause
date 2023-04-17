import LOCATIONS_QUERY from '@/graphql/locations.query';
import { useLazyQuery, useQuery } from '@apollo/client';

export const useLocations = () => useQuery(LOCATIONS_QUERY);
export const useLocationsLazy = () => useLazyQuery(LOCATIONS_QUERY);
