import signale from 'signale'
import * as RA from 'ramda-adjunct'
import * as R from 'ramda'
import * as rx from 'rxjs'
import * as o from 'rxjs/operators'
import * as l from 'lodash'
import {Promise as bb} from 'bluebird'
import gql from 'graphql-tag'
import log from './utils/log'
import flattenGQLResponse from './utils/flattenGQLResponse'
import warn from './utils/warn'
import sleep from './utils/sleep'
import consoleWrite from './utils/consoleWrite'
import axios from 'axios'
import Chance from 'chance'

signale.config({
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

export * from './utils/testing/supertest'

export {
	RA, R, rx, o, l,
	signale, log, bb,
	flattenGQLResponse,
	warn, sleep,
	consoleWrite,
	gql, axios, chance
}
