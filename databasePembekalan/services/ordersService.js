module.exports = exports = (app, pool)=> {

    app.post('/api/addorders', (req, res)=>{
        const {listItem} = req.body;
        //console.log(listItem);

        getReferenceTransaction((referenceCode)=>{
            //console.log(referenceCode);
            var amount = 0;
            var perdetail = ``;
            listItem.forEach((data, i)=>{
                amount = amount + (data.product_price * data.quantity);

                perdetail += perdetail.length > 0 ? `,` : ``; //if else, if perdetail.length is more than 0, add `,` else ``
                perdetail = perdetail + `
                            ((select id from inserted_orderheader), ${data.id}, ${data.quantity}, ${data.product_price}, true, 'admin1', 'now()')`;
                //console.log(data, i);
            });
            //console.log(perdetail);
            var advancedquery = `with inserted_orderheader as(
                                insert into orderheaders(reference, amount, is_active, create_by, create_date)
                                values('${referenceCode}', ${amount}, true, 'admin1', 'now()')
                                returning id
                            )
                            insert into orderdetails(header_id, product_id, quantity, price, is_active, create_by, create_date)
                            values ${perdetail};`;
            //console.log(advancedquery);

            pool.query(advancedquery, (error, result)=>{
                if (error) {
                    return res.send(400, {
                        success: false,
                        data: error,
                    })
                } else {
                    return res.send(200, {
                        success: true,
                        data: {
                            message: `Thank you for your patronage, your product has been successfully ordered`,
                            reference: referenceCode,
                        }
                    })
                }
            });
        });
    });
    getReferenceTransaction = (callback) => {

        
        // SLS-YYMM-0001
        var dt = new Date();
        
        //console.log("dt: ", String(dt));
        const year = String(dt.getFullYear()).substring(2);
        const month = dt.getMonth() + 1 < 10 ? "0" + String(dt.getMonth()+1): dt.getMonth() + 1; //if else model lain pakai '?'


        var newCode = "SLS-"+year+month+"-";


        const query = `select max(reference) as reference from orderheaders;`; //check backend, create REFERENCE
        pool.query(query, (error, result)=>{
            if (error) {
                return {
                    success: false,
                    data: error,
                }
            } else {
                //console.log("result: ", result.rows[0].reference);
                if (result.rows.length === 0){
                    newCode = newCode + "0001";
                    return callback(newCode)
                }

                var dataReference = result.rows[0].reference.split("-");
                var number = String(Number(dataReference[2])+1).padStart(4, "0"); //padStart, untuk string biar bisa seperti "0001" untuk number, biar nggak muncul "1" doang
                //console.log(number);
                newCode = newCode+number;
                return callback(newCode);
            }
        })// end of backend check, REFERENCE created
    }

    app.get('/api/getordersheader/:id', (req, res)=>{
        var id = req.params.id;
        var query = `select * from orderheaders where id = ${id}`
        pool.query(query, (error, result)=>{
            if (error){
                return res.send(400, {
                    success: false,
                    data: error,
                })
            } else {
                return res.send(200, {
                    success: true,
                    data: result.rows
                })
            }
        })
    });
    app.get('/api/getordersheader', (req, res)=>{
        var query = `select * from orderheaders`
        pool.query(query, (error, result)=>{
            if (error){
                return res.send(400, {
                    success: false,
                    data: error,
                })
            } else {
                return res.send(200, {
                    success: true,
                    data: result.rows
                })
            }
        })
    });

    app.get('/api/getordersdetail/:id', (req, res)=>{
        var id = req.params.id;
        var query = `select * from orderdetails where header_id = ${id}`
        pool.query(query, (error, result)=>{
            if (error){
                return res.send(400, {
                    success: false,
                    data: error,
                })
            } else {
                return res.send(200, {
                    success: true,
                    data: result.rows,
                })
            }
        })
    })
    app.get('/api/getordersdetail', (req, res)=>{
        var query = `select * from orderdetails`
        pool.query(query, (error, result)=>{
            if (error){
                return res.send(400, {
                    success: false,
                    data: error,
                })
            } else {
                return res.send(200, {
                    success: true,
                    data: result.rows,
                })
            }
        })
    })

    app.put('/api/deleteorder', (req, res)=>{
        var query = ``
    })




}