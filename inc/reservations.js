const { promise } = require('./db');
const conn = require('./db');
module.exports = {
    render(req, res, error, success = null) {
        res.render('reservation', {
            title: "Reservas - Restaturante Saboroso!",
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body: req.body,
            error, 
            success
        })
    },
    save(fieds){
        return new Promise((resolve, reject) => {

            let date = fieds.date.split('/');
            date = `${date[2]}-${date[1]}-${date[0]}`;
            conn.query(`INSERT INTO tb_reservations (name, email, people, date, time) 
            VALUES(?,?,?,?,?)`, [
                fieds.name,
                fieds.email,
                fieds.people,
                date,
                fieds.time
            ],(err, results)=> {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }
}