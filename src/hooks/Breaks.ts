import ACCEPT_BREAK_INVITATION from '@/graphql/acceptBreakInvitation.mutation';
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

export const useAcceptBreakInvitation = (options, invitation) =>
  useMutation(ACCEPT_BREAK_INVITATION, {
    update: (cache, { data }) =>
      updatePendingBreakInvitationsCache(cache, { data }, invitation),
    ...options,
  });

export const useDeclineBreakInvitation = (options, invitation) =>
  useMutation(DECLINE_BREAK_INVITATION, {
    update: (cache, { data }) =>
      updatePendingBreakInvitationsCache(cache, { data }, invitation),
    ...options,
  });

const updatePendingBreakInvitationsCache = (cache, { data }, invitation) => {
  const existingInvitations = cache.readQuery({
    query: PENDING_BREAK_INVITATIONS_QUERY,
  });
  const newInvitations =
    existingInvitations.pendingBreakInvitations.edges.filter(
      (t) => t.id !== invitation.id,
    );
  cache.writeQuery({
    query: PENDING_BREAK_INVITATIONS_QUERY,
    data: { pendingBreakInvitations: newInvitations },
  });
};
