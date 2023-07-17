const queryObject = {orderName,phoneNum,address,email};
    const cartProducts=[]
    if(Array.isArray(cartdata)){
        try{
            cartdata.forEach(async(element) =>  {
                const {productid,size,quantity}= element;
                const product = await ProductSchema.findById(productid);
                if(product){
                    cartProducts.pop(product);
                        const currentCart = await cartSchema.create({productid,size,quantity});
                    queryObject.cart.pop(currentCart.id)
                }
                
            });
            const order = await OrderSchema.create(queryObject);
            res.status(200).json({order});
            }
            catch(error){
            console.log(error)
            }
    }else{
        res.send('something wrong here')
    }

    if(order){
        for(let i=0;i<cartProducts.length;i++){
            let {sizeS,sizeM,sizeL,size39,size40,size41,size42}= cartProducts[i].storageid;
            if(cartdata[i])
            cartProducts[i].storageid[size]
            }
        }