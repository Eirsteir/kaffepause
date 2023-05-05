// import UserService from "../api/services/UserService";
import ACCEPT_FRIEND_REQUEST_MUTATION from '@/graphql/acceptFriendRequest.mutation';
import ADD_FRIEND_MUTATION from '@/graphql/addFriend.mutation';
import CANCEL_FRIEND_REQUEST_MUTATION from '@/graphql/cancelFriendRequest.mutation';
import GET_FRIENDING_POSSIBILITIES_QUERY from '@/graphql/getfriendingPossibilities.query';
import ME_QUERY from '@/graphql/me.query';
import REJECT_FRIEND_REQUEST_MUTATION from '@/graphql/rejectFriendRequest.mutation';
import REMOVE_FRIEND_MUTATION from '@/graphql/removeFriend.mutation';
import FRIEND_RECOMMENDATIONS_QUERY from '@/graphql/users/friendRecommendations.query';
import { useMutation, useQuery } from '@apollo/client';

export const useFriendingPossibilities = () =>
  useQuery(GET_FRIENDING_POSSIBILITIES_QUERY);

export const useFriendRecommendations = () =>
  useQuery(FRIEND_RECOMMENDATIONS_QUERY);

export const useAddFriend = (options) =>
  useMutation(ADD_FRIEND_MUTATION, options);

export const useRemoveFriend = (options) =>
  useMutation(REMOVE_FRIEND_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
    ...options,
  });

export const useAcceptFriendRequest = (options) =>
  useMutation(ACCEPT_FRIEND_REQUEST_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
    ...options,
  });

export const useRejectFriendRequest = (options) =>
  useMutation(REJECT_FRIEND_REQUEST_MUTATION, options);

export const useCancelFriendRequest = (options) =>
  useMutation(CANCEL_FRIEND_REQUEST_MUTATION, options);
