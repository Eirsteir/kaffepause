import graphene
from graphene import relay

from kaffepause.location.selectors import get_locations
from kaffepause.location.types import LocationConnection


class LocationQuery(graphene.ObjectType):

    locations = relay.ConnectionField(LocationConnection, query=graphene.String())

    def resolve_locations(root, info, **kwargs):
        return get_locations(**kwargs)


class Query(LocationQuery, graphene.ObjectType):
    pass
