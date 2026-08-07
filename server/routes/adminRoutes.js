var express = require('express');
const { passwordSubmit } = require('../controllers/adminController');
var router = express.Router();

router.post('/', passwordSubmit);

router.get('/check', (req, res) => {
    if (req.session?.adminAuthenticated) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});


module.exports = router;
