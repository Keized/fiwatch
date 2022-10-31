import { makeSchema } from 'nexus'
import { join } from "path";
import * as types from "./types/types";
import { Context } from './context'


export const schema = makeSchema({
    types,
    outputs: {
        schema: join(process.cwd(), "graphql", "schema.graphql"),
        typegen: join(process.cwd(), "node_modules","@types","nexus-typegen","index.d.ts"),
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
})
