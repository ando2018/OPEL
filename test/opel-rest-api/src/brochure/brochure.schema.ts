import * as mongoose from 'mongoose';
import { Brochure } from './brochure.model';

const schema = new mongoose.Schema({
    civility: {
        type: String,
        trim: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    gamme: {
        type: String,
        required: true
    },
    brochureFile: {
        type: String,
        required: true
    },
    brochureName: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
});

export const brochureSchema = mongoose.model<Brochure>('Brochure', schema);
