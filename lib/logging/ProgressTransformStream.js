const { info } = require('./logger');

const PERCENTAGE_STEP_SIZE = 5;

class ProgressTransformOptions {
    constructor (streamLength) {
        this.lastLogged = 0;
        this.progress = 0;
        this.length = streamLength;
    }

    transform (chunk, controller) {
        this.progress += chunk.length;
        controller.enqueue(chunk);
        this.logProgress();
    }

    logProgress () {
        const percentage = Math.trunc(this.progress * 100 / this.length);
        if (percentage >= this.lastLogged + PERCENTAGE_STEP_SIZE) {
            info(`Progress: ${percentage}%`);
            this.lastLogged = percentage;
        }
    }
}

class ProgressTransformStream extends TransformStream {
    constructor (streamLength) {
        super(new ProgressTransformOptions(streamLength));
    }
}

module.exports = ProgressTransformStream;
