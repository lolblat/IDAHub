/**
 * Schema definition for the Projects collection.
 */

import { Schema } from "mongoose";
import { Models } from "../../utils/constants";


const ProjectSchema = Schema({
    name: {
        type: String,
        required: true,
        maxlength: 500
    },
    description: {
        type: String,
        maxlength: 10000
    },
    // MD5 Hash of the reversed file, as hex digest
    hash: {
        type: String,
        required: true,
        minlength: 32,
        maxlength: 32
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: Models.User.name,
        required: true
    },
    public: {
        type: Schema.Types.Boolean,
        required: true,
        default: true
    }
});

export default ProjectSchema;