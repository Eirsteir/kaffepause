import graphene
from graphene import relay

from kaffepause.common.bases import NeomodelGraphQLMixin
from kaffepause.common.decorators import login_required
from kaffepause.users.models import User
from kaffepause.users.mutations import ChangeProfilePicture, UpdateProfile
from kaffepause.users.selectors import get_users, search_users
from kaffepause.users.types import UserConnection, UserNode


class UserQuery(NeomodelGraphQLMixin, graphene.ObjectType):

    user = graphene.Field(UserNode, id=graphene.UUID())
    search_users = relay.ConnectionField(UserConnection, query=graphene.String())

    def resolve_user(root, info, id):
        return User.nodes.get(uuid=id)

    @classmethod
    @login_required
    def resolve_search_users(cls, root, info, query=None, **kwargs):
        current_user = cls.get_current_user()
        if query:
            return search_users(query=query, searched_by=current_user)
        return get_users(fetched_by=current_user)


class MeQuery(NeomodelGraphQLMixin, graphene.ObjectType):
    me = graphene.Field(UserNode)

    @classmethod
    @login_required
    def resolve_me(cls, root, info):
        return cls.get_current_user()


class ProfileMutation(graphene.ObjectType):
    update_profile = UpdateProfile.Field()
    change_profile_picture = ChangeProfilePicture.Field()


class Query(UserQuery, MeQuery, graphene.ObjectType):
    pass


class Mutation(ProfileMutation, graphene.ObjectType):
    pass
