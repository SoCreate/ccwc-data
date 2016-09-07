///<reference path="../types.d.ts"/>
const graphql = require('graphql');
import { speakerType } from './types/speaker';
import { categoryType } from './types/category';
import { sessionType } from './types/session';
import { speakerMutations } from '../mutations/speaker.mutation';
import { DataService } from '../data.service';
import { findById } from '../utils';

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
                    return findById(DataService.getInstance().getData('speakers'), args.id);
                }
            },
            speakers: {
                type: new graphql.GraphQLList(speakerType),
                resolve: function () {
                    return DataService.getInstance().getData('speakers').sort(function (itemA, itemB) {
                        return itemA.lastName > itemB.lastName;
                    });
                }
            },
            categories: {
                type: new graphql.GraphQLList(categoryType),
                resolve: function () {
                    return DataService.getInstance().getData('categories');
                }
            },
            sessions: {
                type: new graphql.GraphQLList(sessionType),
                resolve: function () {
                    return DataService.getInstance().getData('sessions');
                }
            },
            session: {
                type: sessionType,
                args: {
                    id: {type: graphql.GraphQLString}
                },
                resolve: function (_, args) {
                    return findById(DataService.getInstance().getData('sessions'), args.id);
                }
            }
        }
    }),
    mutation: speakerMutations
});