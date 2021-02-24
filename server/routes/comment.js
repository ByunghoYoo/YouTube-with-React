const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post('/saveComment', (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if(err) return res.status(400).json({ success: false, err })

        // writer(userId)에 관련된 모든 정보를 얻기 위해서는 populate를 사용했으나 save안에서는 사용불가, 다시 find로 가져온다.
        Comment.find({ '_id': comment._id })
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, result })
        })

    })

})

module.exports = router;
