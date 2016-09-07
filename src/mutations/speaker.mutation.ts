const graphql = require('graphql');
import { speakerType } from '../schema/types/speaker';
import { DataService } from '../data.service';
import { findById } from '../utils';

export const speakerMutations = new graphql.GraphQLObjectType({
    name: 'speakerMutations',
    description: 'Mutations of speakers',
    fields: () => ({
        updateSpeaker: {
            type: speakerType,
            args: {
                id: { type: graphql.GraphQLString },
                firstName: { type: graphql.GraphQLString },
                lastName: { type: graphql.GraphQLString }
            },
            resolve: (source, args) => {
                let speaker = findById(DataService.getInstance().getData('speakers'), args.id);
                speaker.firstName = args.firstName;
                return speaker;
            },
            error: () => {

            }
        }
    })
});