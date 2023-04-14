import ACCEPT_BREAK_INVITATION from '@/graphql/breaks/acceptBreakInvitation.mutation';
import BREAK_QUERY from '@/graphql/breaks/break.query';
import BREAK_HISTORY_QUERY from '@/graphql/breaks/breakHistory.query';
import BREAKS_PRESENTATION_QUERY from '@/graphql/breaks/breaksPresentation.query';
import DECLINE_BREAK_INVITATION from '@/graphql/breaks/declineBreakInvitation.mutation';
import INITIATE_BREAK_MUTATION from '@/graphql/breaks/initiateBreak.mutation';
import NEXT_BREAK_QUERY from '@/graphql/breaks/nextBreak.query';
import PENDING_BREAK_INVITATIONS_QUERY from '@/graphql/breaks/pendingBreakInvitations.query';
import { useMutation, useQuery } from '@apollo/client';

export const useBreak = (uuid, options?) =>
  useQuery(BREAK_QUERY, {
    variables: { breakUuid: uuid },
    ...options,
  });

export const useBreaksPresentation = () => useQuery(BREAKS_PRESENTATION_QUERY);

export const useBreakHistory = () => useQuery(BREAK_HISTORY_QUERY);

export const useNextBreak = (options?) =>
  useQuery(NEXT_BREAK_QUERY, { fetchPolicy: 'network-only', ...options });

export const usePendingBreakInvitations = (options) =>
  useQuery(PENDING_BREAK_INVITATIONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    ...options,
  });

export const useIniateBreak = (options) =>
  useMutation(INITIATE_BREAK_MUTATION, options);

export const useAcceptBreakInvitation = (options?) =>
  useMutation(ACCEPT_BREAK_INVITATION, options);

export const useDeclineBreakInvitation = (options?) =>
  useMutation(DECLINE_BREAK_INVITATION, options);
