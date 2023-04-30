import MY_ACCOUNT_QUERY from '@/graphql/accounts/myAccount.query';
import { useQuery } from '@apollo/client';

export const useMyAccount = () => useQuery(MY_ACCOUNT_QUERY);
