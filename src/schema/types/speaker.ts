const graphql = require('graphql');
import { sessionType } from './session';
import { DataService } from '../../data.service';

export const speakerType = new graphql.GraphQLObjectType({
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
                    return DataService.getInstance().getData('sessions').filter(function (item) {
                        return item.speakerIds.indexOf(parent.id) >= 0;
                    });
                }
            }
        };
    }
});