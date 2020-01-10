import chalk from 'chalk'

export function warn(...msg: any[]) {
	msg.forEach((value) => {
		console.log(
			chalk.bgBlack.bold.whiteBright(
				typeof value === 'object' ? JSON.stringify(
					value, null, 2) : value))
	})
	
}