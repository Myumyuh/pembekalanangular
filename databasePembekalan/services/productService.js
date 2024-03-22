module.exports = exports = (app, pool) => {

    app.get("/api/product", (req, res)=>{
        const query = `select p.*, c.category_name, v.category_id, v.variant_name
        from product p 
        join variant v on v.id = p.variant_id 
        join category c on c.id = v.category_id
        order by p.id;`
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
    }) //End of /api/product
    app.get("/api/search/product", (req, res)=>{
        const {name = '', page = 1, per_page = 5} = req.query
        var offset = (page-1) * per_page;
        var total_page = `select count(*) from product where lower(product_name) like lower('%${name}%');`;
        
        var query = `select p.*, c.category_name, v.category_id, v.variant_name
        from product p 
        join variant v on v.id = p.variant_id 
        join category c on c.id = v.category_id
        where lower(p.product_name) like lower('%${name}%') order by id 
       	offset ${offset} limit ${per_page};`

        pool.query(total_page, (error, result)=>{
            if (error){
                return res.send(400, {
                    success: false,
                    error: error,
                })
            } else {
                const pagecount = Math.ceil(result.rows[0].count/per_page);
                const totalData = result.rows[0].count;
                pool.query(query, (error, result)=>{
                    if (error){
                        return res.send(400, {
                            success: false,
                            error: error,
                        })
                    } else {
                        return res.send(200, {
                            success: true,
                            page: parseInt(page),
                            per_page: parseInt(per_page),
                            total: parseInt(totalData),
                            total_page: pagecount,
                            data: result.rows,
                        })
                    }
                })
            }
        })
        
        
    })

    app.post('/api/addproduct', (req, res)=>{
        const {variant_id, product_initial, product_name, product_desc, product_price, product_stock, is_active} = req.body;
        const query = `insert into product (variant_id, product_initial, product_name, product_desc, product_price, product_stock, is_active, create_by, create_date)
        values (${variant_id}, '${product_initial}', '${product_name}', '${product_desc}', ${product_price}, ${product_stock}, ${is_active}, 'admin1', 'now()');`;

        if (product_initial === '' || product_name === '' || product_desc === ''){
            return res.send(400, {
                success: false,
                data: error,
            })
        }

        pool.query(query, (error, result)=>{
            if(error){
                return res.send(400, {
                    success: false,
                    error: error,
                })
            } else {
                return res.send(200, {
                    success: true,
                    data: `Product ${product_name} has been successfully added`
                })
            }
        })
    }) //End of /api/addproduct


    app.put('/api/editproduct/:id', (req, res)=> {
        const id = req.params.id;
        const {variant_id, product_initial, product_name, product_desc, product_price, product_stock, is_active} = req.body;
        const query = `update product 
        set variant_id = ${variant_id}, product_initial = '${product_initial}', product_name = '${product_name}', 
        product_desc = '${product_desc}', product_price = ${product_price}, 
        product_stock = ${product_stock}, is_active = ${is_active}, modify_by = 'admin2', modify_date = 'now()' where id = ${id};`;

        const idCheck = `select count(*) from product where id = ${id};`;
        const duplicateCheck = `select count(*) from product where (product_name = '${product_name}' or product_initial = '${product_initial}') and id != ${id};`;

        if (product_initial === '' || product_name === '' || product_desc === ''){
            return res.send(400, {
                success: false,
                data: error,
            })
        }

        pool.query(idCheck, (error, result) => {
            const idCount = result.rows[0].count;
            if(idCount < 1){
                return res.send(400, {
                    success: false,
                    data: "Product does not exist / Product not found"
                })
            } else {
                pool.query(duplicateCheck, (error, result)=>{
                    if (error){
                        return res.send(500, {
                            success: false,
                            error: error,
                        })
                    }
                    const duplicateCount = result.rows[0].count;
                    if (duplicateCount > 0){
                        success: false;
                        data: "Identical product exist"
                    } else {
                        pool.query(query, (error, result)=>{
                            if(error){
                                return res.send(400, {
                                    success: false,
                                    error: error,
                                })
                            } else {
                                return res.send(200, {
                                    success: true,
                                    data: `Product ${product_name} has been successfully edited`
                                })
                            }
                        })
                    }
                })
            }
        })

        
    })

    app.put('/api/deleteproduct/:id', (req, res)=>{
        const id = req.params.id;
        const {is_active} = req.body;
        const query = `update product set is_active = ${is_active} where id = ${id};`;
        const idCheck = `select count(*) from product where id = ${id};`;

        pool.query(idCheck, (error, result)=> {
            const idCount = result.rows[0].count;
            if (idCount < 1){
                return res.send(400, {
                    success: false,
                    data: "Product not found / does not exist"
                })
            } else {
                pool.query(query, (error, result)=>{
                    if (error){
                        return res.send(400, {
                            success: false,
                            data: error,
                        })
                    } else {
                        return res.send(200, {
                            success: true,
                            data: "Product has been marked as deleted",
                        })
                    }
                })
            }
        })
    })

}