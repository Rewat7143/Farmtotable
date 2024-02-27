const {rvmodel} = require("../models/reviewsModel")


const getAllReviews = async(req, res) => {
    const pid = req.params.pid;
    try {
        await rvmodel.find({pid:pid}).then((revs) => {
            res.status(200).json({"reviews":revs})
        })
    } catch (error) {
        res.status(500).json({"msg": "Error, something went wrong"})
    }
}

const createReview = async(req, res) => {
    const pid = req.params.pid;
    const body = req.body;
    try {
        new rvmodel({
            uid: body.uid, pid, stars: body.stars, reviewMsg: body.msg 
        }).save().then(() => {
            res.status(200).json({"msg":"Thanks for the Feedback"})
        }).catch(() => {
            res.status(500).json({"msg": "Error, something went wrong"})
        })
    } catch (error) {
        res.status(500).json({"msg": "Error, something went wrong"})
    }
}

module.exports = {getAllReviews, createReview}