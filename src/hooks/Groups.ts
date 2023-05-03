import CREATE_GROUP_MUTATION from '@/graphql/groups/createGroup.mutation';
import MY_GROUPS_QUERY from '@/graphql/groups/myGroups.query';
import { useMutation, useQuery } from '@apollo/client';

export const useMyGroups = () => useQuery(MY_GROUPS_QUERY);

export const useCreateGroup = () => useMutation(CREATE_GROUP_MUTATION);
