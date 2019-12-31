import * as http from 'http'
import {Connection, createConnection, getConnection} from 'typeorm'
import {HOST, PORT} from '../../config/_consts'
import {ORMConfig} from '../../config/_typeorm'
import {main} from '../server'
import {isUp} from '../utils/isUp'
import {sig} from '../utils/log'



export async function setupTests() {
	
	let conn: Connection
	let server: http.Server | null
	jest.setTimeout(30000)
	/**
	 * Connect to running server with test_runner
	 * If no server running, start the server and then connect
	 */
	
	const url = `http://${HOST}:${PORT}`
	if (await isUp(url)) {
		sig.await(`server's up, connecting to database`)
		conn = await createConnection(ORMConfig)
		server = null
	} else {
		sig.await(`${url} is down, starting server`)
		server = await main()
		sig.await(`connecting to database`)
		conn = getConnection()
	}
	sig.warn(`resetting database`)
	await conn.synchronize(true)
	return {conn, server}
}
