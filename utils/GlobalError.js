class GlobalError extends Error {
    constructor(statusCode, status, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }

    // Send error response
    sendError(res) {
        res.status(this.statusCode).json({
            status: this.status,
            message: this.message,
        });
    }

    // print method to log the error
    printError() {
        console.log(`${this.statusCode} - ${this.status}: ${this.message}`);
    }
}

module.exports = GlobalError;
