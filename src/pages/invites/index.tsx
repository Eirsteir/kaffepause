import Invitations from '@/components/invitations/Invitations';

export default function InvitationsPage() {
  return <Invitations />;
}

InvitationsPage.requireAuth = true;
