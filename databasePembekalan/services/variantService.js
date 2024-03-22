module.exports = exports = (app, pool) => {
    app.get("/api/variant", (req, res)=>{
        const query = `select v.*, c.category_name  
        from category c 
        join variant v on c.id = v.category_id;`
        pool.query(query, (error, result)=>{
            if (error){
                return res.send(400, {
                    success: false,
                    error: error,
                })
            } else {
                return res.send(200, {
                    success: true,
                    data: result.rows,
                })
            }
        })
    }) //End of /api/variant

    app.get("/api/variant/:categoryid", (req, res)=>{
        const idCategory = req.params.categoryid;
        const query = `select v.id, v.variant_name, v.category_id , c.category_name  
        from category c 
        join variant v on c.id = v.category_id
        where v.category_id = ${idCategory};`
        pool.query(query, (error, result)=>{
            if (error){
                return res.send(400, {
                    success: false,
                    error: error,
                })
            } else {
                return res.send(200, {
                    success: true,
                    data: result.rows,
                })
            }
        })
    }) //End of /api/variant

    app.post('/api/addvariant', (req, res)=>{
        const {category_id, variant_initial, variant_name, is_active} = req.body;
        const query = `insert into variant(category_id, variant_initial, variant_name, is_active, create_by, create_date)
        values (${category_id}, '${variant_initial}', '${variant_name}', ${is_active}, 'admin1', 'now()');`;

        if (variant_initial === '' || variant_name === '' || category_id === ''){
            return res.send(400, {
                success: false,
                data: error,
            })
        }

        pool.query(query, (error, result)=>{
            if (error){
                return res.send(400, {
                    success: false,
                    data: error,
                })
            } else {
                return res.send(200, {
                    success: true,
                    data: `Data variant named ${variant_name} has been successfully saved`,
                })
            }
        })
    }) //End of /api/addvariant

    app.put('/api/updatevariant/:id', (req, res)=>{
        const id = req.params.id;
        const {category_id, variant_initial, variant_name, is_active} = req.body;
        const query = `update variant 
        set category_id = ${category_id}, variant_initial = '${variant_initial}', variant_name = '${variant_name}', is_active = ${is_active} 
        where id = ${id};`
        const idCheck = `select count(*) from variant where id = ${id};`;
        const duplicateCheck = `select count(*) from variant where (variant_name = '${variant_name}' or variant_initial = '${variant_initial}') and id != ${id};`;

        if (variant_initial === '' || variant_name === '' || category_id === ''){
            return res.send(400, {
                success: false,
                data: error,
            })
        }

        pool.query(idCheck, (error, result)=>{
            const idCount = result.rows[0].count;
            if (idCount < 1){
                return res.send(400,{
                    success: false,
                    data: "Data not found",
                })
            } else {
                pool.query(duplicateCheck, (error, result)=>{
                    if (error){
                        return res.send(500,{
                            success: false,
                            error: error,
                        })
                    }
                    const duplicateCount = result.rows[0].count;
                    if (duplicateCount > 0){
                        return res.send(409,{
                            success: false,
                            data: "Data already exist",
                        })
                    } else {
                        pool.query(query, (error, result)=>{
                            if (error){
                                return res.send(400,{
                                    success: false,
                                    data: error,
                                });
                            } else {
                                return res.send(200,{
                                    success: true,
                                    data: "Data Updated",
                                });
                            }
                        })
                    }
                })
            }
        })
    }) // End of /api/updatevariant/:id


    app.put('/api/deletevariant/:id', (req, res)=>{
        const id = req.params.id;
        const {is_active} = req.body;
        const idCheck = `select count(*) from variant where id = ${id};`;
        const query = `update variant set is_active = ${is_active} where id = ${id}`
        // const query = `update variant set is_active = false where id = ${id}`
        pool.query(idCheck, (error, result)=>{
            const idCount = result.rows[0].count;
            if (idCount < 1){
                return res.send(400,{
                    success: false,
                    data: "Data not found",
                })
            } else {
                pool.query(query, (error, result)=>{
                    if (error){
                        return res.send(400,{
                            success: false,
                            data: error,
                        });
                    } else {
                        return res.send(200,{
                            success: true,
                            data: "Data Updated",
                        });
                    }
                })
            }
        })
    })



    // End of Code
}