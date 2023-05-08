import CREATE_GROUP_MUTATION from '@/graphql/groups/createGroup.mutation';
import GROUP_QUERY from '@/graphql/groups/group.query';
import MY_GROUPS_QUERY from '@/graphql/groups/myGroups.query';
import REMOVE_GROUP_MEMBER_MUTATION from '@/graphql/groups/removeGroupMember.mutation';
import { Group } from '@/types/Group';
import { useMutation, useQuery } from '@apollo/client';

export const useMyGroups = () => useQuery(MY_GROUPS_QUERY);

export const useCreateGroup = () => useMutation(CREATE_GROUP_MUTATION);

export const useGroup = (uuid: Group['uuid']) =>
  useQuery(GROUP_QUERY, { variables: { uuid: uuid } });

export const useRemoveGroupMember = () =>
  useMutation(REMOVE_GROUP_MEMBER_MUTATION, {
    update(
      cache,
      {
        data: {
          removeGroupMember: { group },
        },
      },
    ) {
      cache.modify({
        fields: {
          group(existingGroup = {}) {
            return {
              ...existingGroup,
              ...group,
            };
          },
        },
      });
    },
  });
