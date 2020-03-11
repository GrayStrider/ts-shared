import sig from 'signale'
import { Promise as bb } from 'bluebird'
import Chance from 'chance'

import log from './utils/log'
import flattenGQLResponse from './utils/flattenGQLResponse'
import warn from './utils/warn'
import consoleWrite from './utils/consoleWrite'

sig.config({
	displayScope: true,
	displayBadge: false,
	displayDate: false,
	displayFilename: true,
	displayLabel: true,
	displayTimestamp: true,
	underlineLabel: true,
	underlineMessage: false,
	underlinePrefix: false,
	underlineSuffix: false,
	uppercaseLabel: false,
})

const chance = new Chance()

// isStrictEqual
function isSE (act: unknown = true, exp: unknown = false) {
	return expect
	(act).toStrictEqual (exp)
}


export * from './utils/testing/supertest'
export {
	sig,
	log,
	bb,
	flattenGQLResponse,
	warn,
	consoleWrite,
	chance,
	isSE
}
