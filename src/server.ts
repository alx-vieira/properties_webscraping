import express from 'express';
import { mongoConnect } from './database/mongodb';

mongoConnect();

const server = express();

server.listen(3000);