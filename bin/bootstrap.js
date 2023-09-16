function bootstrap(command, help, version) {
    const argv = process.argv.slice(2)

    switch (argv[0]) {
        case undefined:
        case "-h":
        case "--help":
            return help(process.stdout)

        case "-v":
        case "--version":
            return version(process.stdout)

        default:
            // Main
            return command(
                argv,
                process.stdout,
                process.stderr
            ).then(
                () => {
                    // I'm not sure why, but maybe the process never exits
                    // on Git Bash (MINGW64)
                    process.exit(0)
                },
                () => {
                    process.exit(1)
                }
            )
    }
}

module.exports = bootstrap;