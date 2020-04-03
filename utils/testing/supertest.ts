import st, { SuperTest, Test } from 'supertest'
import { ASTNode, print } from 'graphql'
import { flattenGQLResponse } from '../..'
import http from 'http'

function supertest (
	app: http.Server,
	gqlEndpoint = '/graphql'
) {
	const base = st (app)
	const req = <T = object, V = object>
	(query: ASTNode, variables?: V) => base
		.post (gqlEndpoint)
		.send ({
			query: print (query),
			variables
		})
	const post = async <T = object, V = object>
	(query: ASTNode, variables?: V) => base
			.post (gqlEndpoint)
			.send ({
				query: print (query),
				variables
			})
			.then (res => flattenGQLResponse<T> (res.body))
	
	return { req, post }
}

type Req = ReturnType<typeof supertest>['req']
type Post = ReturnType<typeof supertest>['post']

export { supertest, SuperTest, Test, Post, Req }
