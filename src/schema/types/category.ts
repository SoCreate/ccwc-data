const graphql = require('graphql');
import { sessionType } from './session';
import { DataService } from '../../data.service';

export const categoryType = new graphql.GraphQLObjectType({
    name: 'Category',
    fields: function () {
        return {
            id: {type: graphql.GraphQLString},
            name: {type: graphql.GraphQLString},
            sessions: {
                type: new graphql.GraphQLList(sessionType),
                resolve: function (parent) {
                    return DataService.getInstance().getData('sessions').filter(function (item) {
                        return item.categoryIds.indexOf(parent.id) >= 0;
                    });
                }
            }
        };
    }
});
