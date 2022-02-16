module.exports = app => {


    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    const authRouter = require("./auth.routes");
    app.use("/", authRouter)

    const userRouter = require("./user.routes");
    app.use("/usuario", userRouter)

    const casesRouter = require("./cases.routes");
    app.use("/usuario", casesRouter)

    const commentRouter = require("./comment.routes")
    app.use("/usuario", commentRouter)

    const apiRouter = require("./api.routes");
    app.use("/api", apiRouter)

    const eventsRouter = require("./events.routes");
    app.use("/eventos", eventsRouter)

    
}