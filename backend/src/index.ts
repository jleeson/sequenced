import { Application } from "@outwalk/firefly";
import { ExpressPlatform } from "@outwalk/firefly/express";
import { MongooseDatabase } from "@outwalk/firefly/mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import MongoStore from "connect-mongo";
import session from "express-session";

import { rateLimit } from 'express-rate-limit'

/* setup the platform and global middleware */
const platform = new ExpressPlatform();
platform.use(cors({ origin: ['https://api.sequenced.ottegi.com','https://sequenced.ottegi.com', 'http://localhost:5173', 'http://localhost:8080'], credentials: true }));
platform.use(cookieParser());
platform.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
}));

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