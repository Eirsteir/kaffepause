import ADD_USER_LOCATION_MUTATION from '@/graphql/locations/addUserLocation.mutation';
import LOCATIONS_QUERY from '@/graphql/locations/locations.query';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

export const useLocations = () => useQuery(LOCATIONS_QUERY);

export const useLocationsLazy = () => useLazyQuery(LOCATIONS_QUERY);

export const useAddUserLocation = (options?) =>
  useMutation(ADD_USER_LOCATION_MUTATION, options);
