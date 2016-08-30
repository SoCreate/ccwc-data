///<reference path="../types.d.ts"/>
const graphql = require('graphql');

const data = require('../data/2016scheduledata.json');

const findById = function (list, id) {
    let idToMatch = parseInt(id);
    return list.find(function (item) {
        return item.id === idToMatch;
    });
};

const speakerType = new graphql.GraphQLObjectType({
    name: 'Speaker',
    fields: function () {
        return {
            id: {type: graphql.GraphQLString},
            firstName: {type: graphql.GraphQLString},
            middleName: {type: graphql.GraphQLString},
            lastName: {type: graphql.GraphQLString},
            sessions: {
                type: new graphql.GraphQLList(sessionType),
                resolve: function (parent) {
                    return data.sessions.filter(function (item) {
                        return item.speakerIds.indexOf(parent.id) >= 0;
                    });
                }
            }
        };
    }
});
const categoryType = new graphql.GraphQLObjectType({
    name: 'Category',
    fields: function () {
        return {
            id: { type: graphql.GraphQLString },
            name: { type: graphql.GraphQLString },
            sessions: {
                type: new graphql.GraphQLList(sessionType),
                resolve: function (parent) {
                    return data.sessions.filter(function (item) {
                        return item.categoryIds.indexOf(parent.id) >= 0;
                    });
                }
            }
        };
    }
});

const sessionType = new graphql.GraphQLObjectType({
    name: 'Session',
    fields: {
        id: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString},
        likes: {
            type: graphql.GraphQLInt,
            resolve: function () {
                return 99;
            }
        },
        categories: {
            type: new graphql.GraphQLList(categoryType),
            resolve: function (parent) {
                return data.categories.filter(function (item) {
                    return parent.categoryIds.indexOf(item.id) >= 0;
                });
            }
        }
    }
});

export const schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            speaker: {
                type: speakerType,
                args: {
                    id: {type: graphql.GraphQLString}
                },
                resolve: function (_, args) {
                    return findById(data.speakers, args.id);
                }
            },
            speakers: {
                type: new graphql.GraphQLList(speakerType),
                resolve: function () {
                    return data.speakers.sort(function (itemA, itemB) {
                        return itemA.lastName > itemB.lastName;
                    });
                }
            },
            categories: {
                type: new graphql.GraphQLList(categoryType),
                resolve: function () {
                    return data.categories;
                }
            },
            sessions: {
                type: new graphql.GraphQLList(sessionType),
                resolve: function () {
                    return data.sessions;
                }
            },
            session: {
                type: sessionType,
                args: {
                    id: {type: graphql.GraphQLString}
                },
                resolve: function (_, args) {
                    return findById(data.sessions, args.id);
                }
            }
        }
    })
});