import ACCEPT_BREAK_INVITATION from '@/graphql/breaks/acceptBreakInvitation.mutation';
import BREAK_QUERY from '@/graphql/breaks/break.query';
import BREAK_HISTORY_QUERY from '@/graphql/breaks/breakHistory.query';
import BREAKS_INVITATION_PRESENTATION_QUERY from '@/graphql/breaks/breakInvitationsPresentation.query';
import BREAKS_PRESENTATION_QUERY from '@/graphql/breaks/breaksPresentation.query';
import DECLINE_BREAK_INVITATION from '@/graphql/breaks/declineBreakInvitation.mutation';
import IGNORE_BREAK_INVITATION from '@/graphql/breaks/ignoreBreakInvitation.mutation';
import INITIATE_BREAK_MUTATION from '@/graphql/breaks/initiateBreak.mutation';
import NEXT_BREAK_QUERY from '@/graphql/breaks/nextBreak.query';
import PENDING_BREAK_INVITATIONS_QUERY from '@/graphql/breaks/pendingBreakInvitations.query';
import REQUEST_CHANGE_MUTATION from '@/graphql/breaks/requestChange.mutation';
import { useMutation, useQuery } from '@apollo/client';

export const useBreak = (uuid, options?) =>
  useQuery(BREAK_QUERY, {
    variables: { breakUuid: uuid },
    ...options,
  });

export const useBreaksPresentation = () => useQuery(BREAKS_PRESENTATION_QUERY);

export const useBreakInvitationsPresentation = () =>
  useQuery(BREAKS_INVITATION_PRESENTATION_QUERY);

export const usePendingBreakInvitations = (options?) =>
  useQuery(PENDING_BREAK_INVITATIONS_QUERY, options);

export const useBreakHistory = () => useQuery(BREAK_HISTORY_QUERY);

export const useNextBreak = (options?) =>
  useQuery(NEXT_BREAK_QUERY, { fetchPolicy: 'network-only', ...options });

export const useIniateBreak = (options?) =>
  useMutation(INITIATE_BREAK_MUTATION, {
    ...options,
    update(
      cache,
      {
        data: {
          initiateBreak: { break_ },
        },
      },
    ) {
      cache.modify({
        fields: {
          nextBreak(existingBreak = {}) {
            return {
              ...existingBreak,
              ...break_,
            };
          },
        },
      });
    },
  });

export const useAcceptBreakInvitation = (options?) =>
  useMutation(ACCEPT_BREAK_INVITATION, {
    ...options,
    update(
      cache,
      {
        data: {
          acceptBreakInvitation: { invitation },
        },
      },
    ) {
      cache.modify({
        fields: {
          break_(existingBreak = {}) {
            return {
              ...existingBreak,
              invitation,
            };
          },
          nextBreak(existingBreak = {}) {
            return {
              ...existingBreak,
              invitation,
            };
          },
        },
      });
    },
  });

export const useDeclineBreakInvitation = (options?) =>
  useMutation(DECLINE_BREAK_INVITATION, {
    ...options,
    update(
      cache,
      {
        data: {
          declineBreakInvitation: { invitation },
        },
      },
    ) {
      cache.modify({
        fields: {
          break_(existingBreak = {}) {
            return {
              ...existingBreak,
              invitation,
            };
          },
        },
      });
    },
  });

export const useIgnoreBreakInvitation = (options?) =>
  useMutation(IGNORE_BREAK_INVITATION, {
    ...options,
    update(
      cache,
      {
        data: {
          ignoreBreakInvitation: { invitation },
        },
      },
    ) {
      cache.modify({
        fields: {
          break_(existingBreak = {}) {
            return {
              ...existingBreak,
              invitation,
            };
          },
        },
      });
    },
  });

export const useRequestChange = (options?) =>
  useMutation(REQUEST_CHANGE_MUTATION, {
    ...options,
    update(
      cache,
      {
        data: {
          requestChange: { break_ },
        },
      },
    ) {
      cache.modify({
        fields: {
          break_(existingBreak = {}) {
            return {
              ...existingBreak,
              ...break_,
            };
          },
        },
      });
    },
  });
