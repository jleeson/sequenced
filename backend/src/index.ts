import { Application } from "@outwalk/firefly";
import { ExpressPlatform } from "@outwalk/firefly/express";
import { MongooseDatabase } from "@outwalk/firefly/mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import MongoStore from "connect-mongo";
import session from "express-session";

/* setup the platform and global middleware */
const platform = new ExpressPlatform();
platform.use(cors({ origin: ['sequenced.ottegi.com', 'http://localhost:5173', 'http://localhost:8080'], credentials: true }));
platform.use(cookieParser());

/* setup the database and global plugins */
const database = await new MongooseDatabase().connect();
database.plugin(import("mongoose-lean-id"));

platform.use(session({
    name: "authorization",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
        /* @ts-ignore - connect-mongo has a type conflict here that is safe to ignore */
        client: MongooseDatabase.connection.getClient(),
        collectionName: "session"
    })
}));

/* start the application */
new Application({ platform, database }).listen();