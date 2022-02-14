module.exports = app => {

    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    const authRouter = require("./auth.routes");
    app.use("/", authRouter)

    const userRouter = require("./user.routes");
    app.use("/usuario", userRouter)

    const apiRouter = require("./api.routes");
    app.use("/api", apiRouter)
}