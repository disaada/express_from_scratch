const { uuid } = require('uuidv4')
const db = require('../../models')

const list = (req, res) => res.render('users', { data: 'ini datanya' })

const create_get = (req, res) => res.render('create', { data: 'ini datanya' })

const create_post = async (req, res) => {
    const { name, password, email, birth_date } = req.body
    let fileName = ''
    if(req.files) {
        const upload = req.files.avatar
        const nameArr = upload.name.split('.')
        const ext = `.${nameArr[nameArr.length - 1]}`
        fileName = uuid() + ext
        upload.mv('./uploads/' + fileName)
        const data = { name, password, email, avatar: fileName, birth_date }
        const user = await db.User.create(data)

        if(user) res.send('success')
        else res.send('failed')
    }
}

const details = (req, res) => {
    id = req.params.id
    db.User.findByPk(id, { raw: true, nest: true }).then(
        (data) => { 
            data.avatar = '/uploads/'+data.avatar
            res.render('details', {data}) 
        },
        (err) => res.send(err)
    )
}

module.exports = {
    list,
    create_get,
    create_post,
    details
}