module.exports = exports = (app, pool) => {
    app.get("/api/category", (req, res) =>{
        const query = 'SELECT * FROM category';

        pool.query(query, (error, result)=> {
            if (error){
                return res.send(400,{
                    success: false,
                    data: error,
                });
            } else {
                return res.send(200,{
                    success: true,
                    data: result.rows,
                });
            }
        });
    });

    app.post("/api/addcategory", (req, res) =>{

        console.log(req.body);
        //var initial = req.body.category_initial
        //var name = req.body.category_name
        //var isActive = req.body.is_active
        
        const {category_initial, category_name, is_active} = req.body;
        const duplicateCheck = `select count(*) as count from category c  where category_name = '${category_name}' or category_initial = '${category_initial}'; `;

        pool.query(duplicateCheck, (error, result)=>{
            if (error){
                return res.send(500,{
                    success: false,
                    error: error,
                })
            }

            const duplicateCount = result.rows[0].count;
            if (duplicateCount > 0){
                return res.send(409, {
                    success: false,
                    data: "Data already exist!",
                    }
                )
            } else {
                const query = `INSERT INTO category(category_initial, category_name, is_active, create_by, create_date) 
                       VALUES ('${category_initial}', '${category_name}', ${is_active}, 'admin1', 'now()');`; // petik sebelah 1
        
        
                pool.query(query, (error,result)=>{ //pool = query, berarti pool.query itu fungsi menjalankan query pada database pool yang telah disetting
                    if (error){
                        return res.send(500, {
                            success: false,
                            data: "Something went wrong, please try again later"
                        })
                    } else {
                        return res.send(201, {
                            success: true,
                            data: `Data Category ${category_name} saved.` //petik sebelah 1 biar bisa manggil ${variable}
                        })
                    }
                })
            }
        })

        
    })

    app.put("/api/updatecategory/:id", (req, res) =>{
        const id = req.params.id
        const {category_initial, category_name, is_active} = req.body;
        const idCheck = `select count(*) from category where id = ${id};`;
        const duplicateCheck = `select count(*) as count from category c 
                                where (category_name = '${category_name}' or category_initial = '${category_initial}') and id !=${id};`;

        const query = `update category
        set category_initial = '${category_initial}', category_name = '${category_name}', is_active = ${is_active}, modify_by = 'admin2', modify_date = 'now()'
        where id = ${id};`;

        pool.query(idCheck, (error, result)=>{
            const idCount = result.rows[0].count;
            if (idCount < 1){
                return res.send(200,{
                    success: true,
                    data: "Data not found",
                })
            } else {
                pool.query(duplicateCheck, (error, result)=> {
                    if (error){
                        return res.send(500,{
                            success: false,
                            error: error,
                        })
                    }
                    const duplicateCount = result.rows[0].count;
                    const checkActive = 'select '
                    if (duplicateCount > 0){
                        return res.send(409,{
                            success: false,
                            data: "Data already exist",
                        })
                    } else {
                        pool.query(query, (error, result)=> {
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
        
        
    })

    app.put("/api/statusupdatecategory/:id", (req, res) =>{
        const id = req.params.id
        const {is_active} = req.body;
        const idCheck = `select count(*) from category where id = ${id};`;
        //const query = `update category set is_active = ${is_active}, modify_by = 'admin2', modify_date = 'now()' where id = ${id};`;
        const query = `update category set is_active = false, modify_by = 'admin2', modify_date = 'now()' where id = ${id};`;

        pool.query(idCheck, (error, result)=>{
            const idCount = result.rows[0].count;
            if (idCount < 1){
                return res.send(400,{
                    success: false,
                    data: "Data not found",
                })
            } else {
                pool.query(query, (error, result) =>{
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
}