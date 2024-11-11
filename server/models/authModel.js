    const mongoose = require('mongoose')
    const { model } = require('mongoose')

    const authSchema = mongoose.Schema({

        name : {
            type : String,
            require : true
        },
        email : {
            type : String,
            require:true,
        },
        password : {
            type : String,
            require:true,
        },
        usertype : {
            type : String,
            require:true,
            enum : ['user', 'admin']
        },
        

    //     profileImage: {
    //         type: String, // Usually you store the path or URL of the image
    //         required: true, // Ensure the image is required
    //         validate: {
    //             validator: function(v) {
    //                 // Check if the value is a valid image URL format (optional)
    //                 return /\.(jpg|jpeg|png|gif)$/.test(v);
    //             },
    //             message: props => `${props.value} is not a valid image format! Supported formats: jpg, jpeg, png, gif.`
    //         }
        
    //     // profileId : {
    //     //     type : mongoose.Schema.Types.ObjectId,
    //     //     ref : "profile" 
    //     // }
    // }
    })


    const authModel = mongoose.model('auth', authSchema)

    exports.findUser = (query) => authModel.findOne(query)

    exports.createUser = (obj) => authModel.create(obj)

    exports.findUserById = (_id) => authModel.findById(_id);
