import { last } from 'ramda'
import chalk from 'chalk'
import ora from 'ora'
import { toError, isRight } from 'fp-ts/lib/Either'
import { tryCatch } from 'fp-ts/lib/TaskEither'

export default async function spinner<T> (promise: Promise<T>, onProgress = 'Working..', onDone = 'Done.') {
	const path = new Error ().stack
		?.split ('\n')[2]
		.match (/\((.+)\)/)![1]
		.split ('\\')
	
	const now = new Date ()
	const pad = (time: number) => time.toString ().padStart (2, '0')
	const [h, m, s] = [now.getHours (), now.getMinutes (), now.getSeconds ()].map (pad)
	const fileName = last (path) ?? '???'
	const prefixText = chalk.gray (`[${h}:${m}:${s}] [${fileName}] »`)
	
	
	const spinner = ora ({
		text: onProgress,
		prefixText,
		spinner: {
			'interval': 80,
			'frames': ['⠋', '⠙', '⠚', '⠞', '⠖', '⠦', '⠴', '⠲', '⠳', '⠓']
		}
	}).start ()
	
	const res = await tryCatch (() => promise, toError) ()
	
	if (isRight (res)) {
		spinner.succeed (onDone)
		return res
	} else {
		spinner.fail (res.left.message)
		return res
	}
	
}
