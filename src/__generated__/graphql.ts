/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedErrorType: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  OutputErrorType: any;
  SocialCamelJSON: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type AcceptBreakInvitation = {
  __typename?: 'AcceptBreakInvitation';
  errors?: Maybe<Scalars['OutputErrorType']>;
  invitation?: Maybe<BreakInvitation>;
  success?: Maybe<Scalars['Boolean']>;
};

export type AcceptFriendRequest = {
  __typename?: 'AcceptFriendRequest';
  errors?: Maybe<Scalars['OutputErrorType']>;
  friend?: Maybe<User>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Account = Node & {
  __typename?: 'Account';
  archived?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  secondaryEmail?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['UUID']>;
  verified?: Maybe<Scalars['Boolean']>;
};

/**
 * Archive account and revoke refresh tokens.
 *
 * User must be verified and confirm password.
 */
export type ArchiveAccount = {
  __typename?: 'ArchiveAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Break = Node & {
  __typename?: 'Break';
  /** The ID of the object. */
  id: Scalars['ID'];
  invitation?: Maybe<BreakInvitation>;
  location?: Maybe<Location>;
  participants?: Maybe<UserConnection>;
  startingAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['UUID']>;
};


export type BreakParticipantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type BreakConnection = {
  __typename?: 'BreakConnection';
  count?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BreakEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `Break` and its cursor. */
export type BreakEdge = {
  __typename?: 'BreakEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Break>;
};

export type BreakInvitation = Node & {
  __typename?: 'BreakInvitation';
  addresseeCount?: Maybe<Scalars['Int']>;
  created?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  sender?: Maybe<User>;
  subject?: Maybe<Break>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type BreakInvitationConnection = {
  __typename?: 'BreakInvitationConnection';
  count?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BreakInvitationEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `BreakInvitation` and its cursor. */
export type BreakInvitationEdge = {
  __typename?: 'BreakInvitationEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<BreakInvitation>;
};

export type CancelFriendRequest = {
  __typename?: 'CancelFriendRequest';
  cancelledFriendRequestee?: Maybe<User>;
  errors?: Maybe<Scalars['OutputErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ChangeProfilePicture = {
  __typename?: 'ChangeProfilePicture';
  errors?: Maybe<Scalars['OutputErrorType']>;
  profilePic?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type DeclineBreakInvitation = {
  __typename?: 'DeclineBreakInvitation';
  errors?: Maybe<Scalars['OutputErrorType']>;
  invitation?: Maybe<BreakInvitation>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Permanently delete an account and the related user node. */
export type DeleteAccount = {
  __typename?: 'DeleteAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Debugging information for the current query. */
export type DjangoDebug = {
  __typename?: 'DjangoDebug';
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  __typename?: 'DjangoDebugSQL';
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars['String'];
  /** Duration of this database query in seconds. */
  duration: Scalars['Float'];
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars['String']>;
  /** Whether this database query was a SELECT. */
  isSelect: Scalars['Boolean'];
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars['Boolean'];
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars['String']>;
  /** JSON encoded database query parameters. */
  params: Scalars['String'];
  /** The raw SQL of this query, without params. */
  rawSql: Scalars['String'];
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars['String']>;
  /** Start time of this database query. */
  startTime: Scalars['Float'];
  /** Stop time of this database query. */
  stopTime: Scalars['Float'];
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars['String']>;
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars['String']>;
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars['String'];
};

export type FollowFriend = {
  __typename?: 'FollowFriend';
  errors?: Maybe<Scalars['OutputErrorType']>;
  followedFriend?: Maybe<User>;
  success?: Maybe<Scalars['Boolean']>;
};

export type InitiateBreak = {
  __typename?: 'InitiateBreak';
  break_?: Maybe<Break>;
  errors?: Maybe<Scalars['OutputErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Location = Node & {
  __typename?: 'Location';
  children?: Maybe<LocationConnection>;
  /** The ID of the object. */
  id: Scalars['ID'];
  itemType?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['UUID']>;
};


export type LocationChildrenArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type LocationConnection = {
  __typename?: 'LocationConnection';
  count?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LocationEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `Location` and its cursor. */
export type LocationEdge = {
  __typename?: 'LocationEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Location>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptBreakInvitation?: Maybe<AcceptBreakInvitation>;
  acceptFriendRequest?: Maybe<AcceptFriendRequest>;
  /**
   * Archive account and revoke refresh tokens.
   *
   * User must be verified and confirm password.
   */
  archiveAccount?: Maybe<ArchiveAccount>;
  cancelFriendRequest?: Maybe<CancelFriendRequest>;
  changeProfilePicture?: Maybe<ChangeProfilePicture>;
  declineBreakInvitation?: Maybe<DeclineBreakInvitation>;
  /** Permanently delete an account and the related user node. */
  deleteAccount?: Maybe<DeleteAccount>;
  followFriend?: Maybe<FollowFriend>;
  initiateBreak?: Maybe<InitiateBreak>;
  /**
   * Change account password when user knows the old password.
   *
   * A new token and refresh token are sent. User must be verified.
   */
  passwordChange?: Maybe<PasswordChange>;
  /**
   * Change user password without old password.
   *
   * Receive the token that was sent by email.
   *
   * If token and new passwords are valid, update
   * user password and in case of using refresh
   * tokens, revoke all of them.
   *
   * Also, if user has not been verified yet, verify it.
   */
  passwordReset?: Maybe<PasswordReset>;
  /**
   * Set user password - for passwordless registration
   *
   * Receive the token that was sent by email.
   *
   * If token and new passwords are valid, set
   * user password and in case of using refresh
   * tokens, revoke all of them.
   *
   * Also, if user has not been verified yet, verify it.
   */
  passwordSet?: Maybe<PasswordSet>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
  /**
   * Register a user with an account and a related user node.
   * The process is absolute, either everything is completed or nothing is.
   */
  register?: Maybe<Register>;
  rejectFriendRequest?: Maybe<RejectFriendRequest>;
  /**
   * Remove user secondary email.
   *
   * Require password confirmation.
   */
  removeSecondaryEmail?: Maybe<RemoveSecondaryEmail>;
  /**
   * Sends activation email.
   *
   * It is called resend because theoretically
   * the first activation email was sent when
   * the user registered.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  resendActivationEmail?: Maybe<ResendActivationEmail>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  revokeToken?: Maybe<RevokeToken>;
  sendFriendRequest?: Maybe<SendFriendRequest>;
  /**
   * Send password reset email.
   *
   * For non verified users, send an activation
   * email instead.
   *
   * Accepts both primary and secondary email.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
  /**
   * Send activation to secondary email.
   *
   * User must be verified and confirm password.
   */
  sendSecondaryEmailActivation?: Maybe<SendSecondaryEmailActivation>;
  /** Social Auth for JSON Web Token (JWT) */
  socialAuth?: Maybe<SocialAuthJwt>;
  /**
   * Swap between primary and secondary emails.
   *
   * Require password confirmation.
   */
  swapEmails?: Maybe<SwapEmails>;
  /**
   * Obtain JSON web token for given user.
   *
   * Allow to perform login with different fields,
   * and secondary email if set. The fields are
   * defined on settings.
   *
   * Not verified users can login by default. This
   * can be changes on settings.
   *
   * If user is archived, make it unarchive and
   * return `unarchiving=True` on output.
   */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  unfollowFriend?: Maybe<UnfollowFriend>;
  unfriendUser?: Maybe<UnfriendUser>;
  updateProfile?: Maybe<UpdateProfile>;
  updateStatus?: Maybe<UpdateStatus>;
  /**
   * Verify user account.
   *
   * Receive the token that was sent by email.
   * If the token is valid, make the user verified
   * by making the `user.status.verified` field true.
   */
  verifyAccount?: Maybe<VerifyAccount>;
  /**
   * Verify user secondary email.
   *
   * Receive the token that was sent by email.
   * User is already verified when using this mutation.
   *
   * If the token is valid, add the secondary email
   * to `user.status.secondary_email` field.
   *
   * Note that until the secondary email is verified,
   * it has not been saved anywhere beyond the token,
   * so it can still be used to create a new account.
   * After being verified, it will no longer be available.
   */
  verifySecondaryEmail?: Maybe<VerifySecondaryEmail>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  verifyToken?: Maybe<VerifyToken>;
};


export type MutationAcceptBreakInvitationArgs = {
  invitation?: InputMaybe<Scalars['UUID']>;
};


export type MutationAcceptFriendRequestArgs = {
  requester: Scalars['String'];
};


export type MutationArchiveAccountArgs = {
  password: Scalars['String'];
};


export type MutationCancelFriendRequestArgs = {
  toFriend: Scalars['String'];
};


export type MutationChangeProfilePictureArgs = {
  profilePic: Scalars['Upload'];
};


export type MutationDeclineBreakInvitationArgs = {
  invitation?: InputMaybe<Scalars['UUID']>;
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationFollowFriendArgs = {
  friendId: Scalars['UUID'];
};


export type MutationInitiateBreakArgs = {
  addressees?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  location?: InputMaybe<Scalars['UUID']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
};


export type MutationPasswordChangeArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  token: Scalars['String'];
};


export type MutationPasswordSetArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
  preferredLocationUuid?: InputMaybe<Scalars['UUID']>;
  username: Scalars['String'];
};


export type MutationRejectFriendRequestArgs = {
  requester: Scalars['String'];
};


export type MutationRemoveSecondaryEmailArgs = {
  password: Scalars['String'];
};


export type MutationResendActivationEmailArgs = {
  email: Scalars['String'];
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationSendFriendRequestArgs = {
  toFriend: Scalars['String'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendSecondaryEmailActivationArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSocialAuthArgs = {
  accessToken: Scalars['String'];
  provider: Scalars['String'];
};


export type MutationSwapEmailsArgs = {
  password: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationUnfollowFriendArgs = {
  friendId: Scalars['UUID'];
};


export type MutationUnfriendUserArgs = {
  friend: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  locale: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateStatusArgs = {
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  statusType: StatusUpdateType;
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};


export type MutationVerifySecondaryEmailArgs = {
  token: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/**
 * Obtain JSON web token for given user.
 *
 * Allow to perform login with different fields,
 * and secondary email if set. The fields are
 * defined on settings.
 *
 * Not verified users can login by default. This
 * can be changes on settings.
 *
 * If user is archived, make it unarchive and
 * return `unarchiving=True` on output.
 */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  unarchiving?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserNode>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/**
 * Change account password when user knows the old password.
 *
 * A new token and refresh token are sent. User must be verified.
 */
export type PasswordChange = {
  __typename?: 'PasswordChange';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Change user password without old password.
 *
 * Receive the token that was sent by email.
 *
 * If token and new passwords are valid, update
 * user password and in case of using refresh
 * tokens, revoke all of them.
 *
 * Also, if user has not been verified yet, verify it.
 */
export type PasswordReset = {
  __typename?: 'PasswordReset';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Set user password - for passwordless registration
 *
 * Receive the token that was sent by email.
 *
 * If token and new passwords are valid, set
 * user password and in case of using refresh
 * tokens, revoke all of them.
 *
 * Also, if user has not been verified yet, verify it.
 */
export type PasswordSet = {
  __typename?: 'PasswordSet';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  __debug?: Maybe<DjangoDebug>;
  allBreakInvitations?: Maybe<BreakInvitationConnection>;
  breakHistory?: Maybe<BreakConnection>;
  expiredBreakInvitations?: Maybe<BreakInvitationConnection>;
  friendingPossibilities?: Maybe<UserConnection>;
  friendships?: Maybe<UserConnection>;
  locations?: Maybe<LocationConnection>;
  me?: Maybe<User>;
  myAccount?: Maybe<Account>;
  outgoingFriendRequests?: Maybe<UserConnection>;
  pendingBreakInvitations?: Maybe<BreakInvitationConnection>;
  searchUsers?: Maybe<UserConnection>;
  user?: Maybe<User>;
};


export type QueryAllBreakInvitationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryBreakHistoryArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryExpiredBreakInvitationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryFriendingPossibilitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryFriendshipsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['String']>;
};


export type QueryLocationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};


export type QueryOutgoingFriendRequestsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPendingBreakInvitationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['UUID']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Register a user with an account and a related user node.
 * The process is absolute, either everything is completed or nothing is.
 */
export type Register = {
  __typename?: 'Register';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

export type RejectFriendRequest = {
  __typename?: 'RejectFriendRequest';
  errors?: Maybe<Scalars['OutputErrorType']>;
  rejectedFriendRequestee?: Maybe<User>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Remove user secondary email.
 *
 * Require password confirmation.
 */
export type RemoveSecondaryEmail = {
  __typename?: 'RemoveSecondaryEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Sends activation email.
 *
 * It is called resend because theoretically
 * the first activation email was sent when
 * the user registered.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type ResendActivationEmail = {
  __typename?: 'ResendActivationEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RevokeToken = {
  __typename?: 'RevokeToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  revoked?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SendFriendRequest = {
  __typename?: 'SendFriendRequest';
  errors?: Maybe<Scalars['OutputErrorType']>;
  sentFriendRequestee?: Maybe<User>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Send password reset email.
 *
 * For non verified users, send an activation
 * email instead.
 *
 * Accepts both primary and secondary email.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type SendPasswordResetEmail = {
  __typename?: 'SendPasswordResetEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Send activation to secondary email.
 *
 * User must be verified and confirm password.
 */
export type SendSecondaryEmailActivation = {
  __typename?: 'SendSecondaryEmailActivation';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Social Auth for JSON Web Token (JWT) */
export type SocialAuthJwt = {
  __typename?: 'SocialAuthJWT';
  social?: Maybe<SocialType>;
  token?: Maybe<Scalars['String']>;
};

export type SocialNode = Node & {
  __typename?: 'SocialNode';
  created: Scalars['DateTime'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  modified: Scalars['DateTime'];
  provider: Scalars['String'];
  uid: Scalars['String'];
};

export type SocialNodeConnection = {
  __typename?: 'SocialNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SocialNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `SocialNode` and its cursor. */
export type SocialNodeEdge = {
  __typename?: 'SocialNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<SocialNode>;
};

export type SocialType = {
  __typename?: 'SocialType';
  created: Scalars['DateTime'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
  id: Scalars['ID'];
  modified: Scalars['DateTime'];
  provider: Scalars['String'];
  uid: Scalars['String'];
};

export type StatusUpdate = Node & {
  __typename?: 'StatusUpdate';
  created?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  statusType?: Maybe<Scalars['String']>;
  verb?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum StatusUpdateType {
  Focusmode = 'FOCUSMODE',
  Inactive = 'INACTIVE',
  OnABreak = 'ON_A_BREAK',
  ReadyForBreak = 'READY_FOR_BREAK',
  Unknown = 'UNKNOWN'
}

/**
 * Swap between primary and secondary emails.
 *
 * Require password confirmation.
 */
export type SwapEmails = {
  __typename?: 'SwapEmails';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UnfollowFriend = {
  __typename?: 'UnfollowFriend';
  errors?: Maybe<Scalars['OutputErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
  unfollowedFriend?: Maybe<User>;
};

export type UnfriendUser = {
  __typename?: 'UnfriendUser';
  errors?: Maybe<Scalars['OutputErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
  unfriendedPerson?: Maybe<User>;
};

export type UpdateProfile = {
  __typename?: 'UpdateProfile';
  errors?: Maybe<Scalars['OutputErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type UpdateStatus = {
  __typename?: 'UpdateStatus';
  currentStatus?: Maybe<StatusUpdate>;
  errors?: Maybe<Scalars['OutputErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type User = Node & {
  __typename?: 'User';
  currentLocation?: Maybe<Location>;
  currentStatus?: Maybe<StatusUpdate>;
  friends?: Maybe<UserConnection>;
  friendshipStatus?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  isViewerFriend?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preferredLocation?: Maybe<Location>;
  profilePic?: Maybe<Scalars['String']>;
  socialContext?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['UUID']>;
};


export type UserFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  count?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `User` and its cursor. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<User>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  archived?: Maybe<Scalars['Boolean']>;
  dateJoined: Scalars['DateTime'];
  email: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  pk?: Maybe<Scalars['Int']>;
  secondaryEmail?: Maybe<Scalars['String']>;
  socialAuth: SocialNodeConnection;
  verified?: Maybe<Scalars['Boolean']>;
};


export type UserNodeSocialAuthArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * Verify user account.
 *
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
export type VerifyAccount = {
  __typename?: 'VerifyAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Verify user secondary email.
 *
 * Receive the token that was sent by email.
 * User is already verified when using this mutation.
 *
 * If the token is valid, add the secondary email
 * to `user.status.secondary_email` field.
 *
 * Note that until the secondary email is verified,
 * it has not been saved anywhere beyond the token,
 * so it can still be used to create a new account.
 * After being verified, it will no longer be available.
 */
export type VerifySecondaryEmail = {
  __typename?: 'VerifySecondaryEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type VerifyToken = {
  __typename?: 'VerifyToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
};
