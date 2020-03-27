import { keys, head, values } from 'ramda'
import { GraphQLError } from 'graphql'
import { isNonEmpty } from 'fp-ts/lib/Array'
import { sig } from '..'

type GQLResponse<T = any> = {
	data: T,
	errors: GraphQLError[]
}
/**
 * Refactored to be only used in GraphQL responses
 *
 * Yes the function actually returns T | V (input),
 * but the assumption here is that the consumer already knows what kind of data
 * he's gonna get, so that's mosly for convinience, and
 * you totally can specify incorrect types and get a runtime "undefined".
 * It's meant for use in tests, anyway.
 * Too much trouble handling these edge cases
 * @param response
 */
export default function flattenGQLResponse<T = object> (
	response: GQLResponse<T>
): [T, GraphQLError[]] {
	
	const { data, errors } = response
	if (errors && isNonEmpty (errors)) {
		console.log(errors)
		return [data, errors]
	}
	if (keys (data).length > 1)
		return [data, errors]
	
	/**
	 * Return the first (head)
	 * value (values) of the response
	 * same as Object.values(response)[0]
	 */
	return [
		// @ts-ignore
		head (values (data)), []
	]
}
