const mongoose = require('mongoose')

const { Schema } = mongoose;

const projectSchema = new Schema({

    projectName: {
        type: String,
        required: true,
    },

    taskList: {
        type: [{
            taskName: {
                type: String,
                required: true
            },
            isDeleted:{
                type: Boolean,
                default: false
            },
            isDone:{
                type: Boolean,
                default: false
            }

        }],
        required: true
    },

    memberList: {
        type: [{
            memberName: {
                type : String,
                required: true
            },
            isKicked:{
                type: Boolean,
                default : false
            },
            isLeader : {
                type: Boolean,
                default: false
            }
        }],
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

})

projectSchema.statics.deleteByID = (_id) => {
    return this.deleteOne({_id: _id});
}

const Project = mongoose.model('projects', projectSchema);

module.exports = Project
