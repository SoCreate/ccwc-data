const graphql = require('graphql');
import { categoryType } from './category';
import { DataService } from '../../data.service';

export const sessionType = new graphql.GraphQLObjectType({
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
                return DataService.getInstance().getData('categories').filter(function (item) {
                    return parent.categoryIds.indexOf(item.id) >= 0;
                });
            }
        }
    }
});