const strings = require('../../../pkg/strings');

const upload = async (req, res) => {
    try {
        // console.log(req.files.slika.mimetype);
        let mimeType = req.files.slika.mimetype;
        let fileTypes = ["image/jpg", "image/png", "image/apng", "image/avif", "image/gif", "image/jpeg", "image/svg", "image/webp"];
        if(!fileTypes.includes(mimeType)) {
            return res.status(400).send('Bad request. Invalid format!');
        }
        
        let imgSize = req.files.slika.size
        if(imgSize > 1048576) {
            return res.status(400).send('Bad request. Bad limit size');
        };

        let newFileName = `${strings.random(10)}__${req.files.slika.name}`
        req.files.slika.mv(`${__dirname}/../../../uploads/${newFileName}`); // mv prima pateka (ja stavam patekata kade sakam fileot da bide zacuvan) i callback
        res.status(201).send({fileName: newFileName});
    }catch(err) {
        console.log(err);
        return res.status(500).send('Internal server error.')
    }
};

module.exports = {
    upload
};